/**
 * One-time migration: backfill BlogView (event-level) documents so
 * they sum to each Blog's existing cumulative `views` counter.
 *
 * WHY THIS EXISTS
 * Blog.views was incremented via $inc since day one; BlogView only
 * started recording events after the recent feature ship. Without
 * this backfill, every blog published before that ship date shows
 * 0 in /admin/analytics/views-timeseries for any range, even though
 * Blog.views (and /admin/analytics totalViews) correctly shows the
 * real historical total.
 *
 * STRATEGY
 * For each blog:
 *   1. Count existing real BlogView docs for it (don't touch or
 *      duplicate those — they're genuine events).
 *   2. deficit = blog.views - existingRealCount
 *   3. If deficit > 0, generate `deficit` synthetic BlogView docs,
 *      with viewedAt timestamps spread pseudo-randomly between
 *      blog.publishedAt (or createdAt, whichever exists) and now,
 *      weighted slightly toward more-recent dates (recency bias)
 *      so old posts don't look like they got zero traffic ever and
 *      don't unrealistically cluster all traffic on day one either.
 *   4. Bulk-insert in chunks (avoid loading millions of docs in RAM
 *      or sending one giant insertMany).
 *
 * This does NOT modify Blog.views — it only adds BlogView rows so
 * the two stay consistent going forward. Safe to re-run: it always
 * recomputes the deficit against current DB state, so running twice
 * without new real views in between is a no-op (deficit = 0).
 *
 * USAGE
 *   cd backend
 *   npx tsx scripts/backfillBlogViews.ts --dry-run   # preview only, no writes
 *   npx tsx scripts/backfillBlogViews.ts             # actually inserts
 *   # or with ts-node instead of tsx, same flags apply
 *
 * Requires MONGODB_URI / MONGO_URI in your existing .env — reuses
 * whatever your app's DB connection config already uses.
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "../src/models/blog.model";
import BlogView from "../src/models/blogView.model";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || "";

const CHUNK_SIZE = 5000; // insertMany batch size — tune down if you hit memory/network limits

const isDryRun = process.argv.includes("--dry-run");

// Recency-weighted random timestamp between `start` and `end`.
// Exponent > 1 skews toward `end` (more views recently) without
// making old dates impossible — mirrors realistic blog traffic decay
// in reverse (we're backfilling history, so "reverse decay" = more
// mass near "now" than near "publishedAt").
function randomTimestampBiasedRecent(start: Date, end: Date): Date {
  const startMs = start.getTime();
  const endMs = end.getTime();
  if (endMs <= startMs) return new Date(endMs);

  const r = Math.random();
  const biased = Math.pow(r, 0.6); // 0..1, skewed toward 1 (recent)
  const ts = startMs + biased * (endMs - startMs);
  return new Date(ts);
}

async function main() {
  if (!MONGO_URI) {
    console.error(
      "❌ No MONGODB_URI/MONGO_URI found in environment. Aborting — refusing to guess a connection string.",
    );
    process.exit(1);
  }

  if (isDryRun) {
    console.log("🔎 DRY RUN — no documents will be inserted.\n");
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGO_URI);
  console.log("Connected.");

  const now = new Date();
  const blogs = await Blog.find()
    .select("_id title views publishedAt createdAt")
    .lean();

  console.log(`Found ${blogs.length} blogs.\n`);

  let totalInserted = 0;
  let totalWouldInsert = 0;
  let totalSkipped = 0;
  const preview: Array<{
    id: string;
    title: string;
    existing: number;
    target: number;
    deficit: number;
  }> = [];

  for (const blog of blogs) {
    const targetViews = Number(blog.views) || 0;
    if (targetViews <= 0) {
      totalSkipped++;
      continue;
    }

    const existingCount = await BlogView.countDocuments({ blog: blog._id });
    const deficit = targetViews - existingCount;

    if (deficit <= 0) {
      console.log(
        `  [skip] blog ${blog._id}: existing=${existingCount} >= target=${targetViews}`,
      );
      totalSkipped++;
      continue;
    }

    if (isDryRun) {
      console.log(
        `  [would-backfill] blog ${blog._id} "${blog.title}": existing=${existingCount}, target=${targetViews}, would insert=${deficit}`,
      );
      preview.push({
        id: String(blog._id),
        title: blog.title,
        existing: existingCount,
        target: targetViews,
        deficit,
      });
      totalWouldInsert += deficit;
      continue;
    }

    const start = blog.publishedAt || blog.createdAt || now;
    console.log(
      `  [backfill] blog ${blog._id}: existing=${existingCount}, target=${targetViews}, inserting=${deficit}`,
    );

    let remaining = deficit;
    while (remaining > 0) {
      const batchSize = Math.min(CHUNK_SIZE, remaining);
      const docs = Array.from({ length: batchSize }, () => ({
        blog: blog._id,
        viewedAt: randomTimestampBiasedRecent(start, now),
      }));

      await BlogView.insertMany(docs, { ordered: false });
      remaining -= batchSize;
      totalInserted += batchSize;
    }
  }

  console.log("─".repeat(50));
  if (isDryRun) {
    console.log(
      `DRY RUN complete. Would insert: ${totalWouldInsert} across ${preview.length} blogs. Blogs skipped (already synced/zero views): ${totalSkipped}.`,
    );
    console.log(
      "No writes were made. Re-run without --dry-run to actually backfill.",
    );
  } else {
    console.log(
      `Done. Inserted: ${totalInserted}. Blogs skipped (already synced/zero views): ${totalSkipped}.`,
    );
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Backfill failed:", err);
  process.exit(1);
});
