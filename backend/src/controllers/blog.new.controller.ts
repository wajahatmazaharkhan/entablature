import { Request, Response } from "express";
import Blog from "../models/blog.model.js";

/**
 * GET /api/blog/published
 *
 * Query params:
 *  - limit    (optional, default 20, max 50)
 *  - docType  (optional, "BLOG" | "RESEARCH")
 *
 * Returns blogs already shaped for the "Research worth reading" /
 * "Ideas worth sharing" cards, so the frontend doesn't have to
 * reshape anything.
 */
export const getPublishedBlogsLanding = async (req: Request, res: Response) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 50);
    const docType = req.query.docType as string | undefined;

    const filter: Record<string, unknown> = { status: "PUBLISHED" };
    if (docType === "BLOG" || docType === "RESEARCH") {
      filter.docType = docType;
    }

    const blogs = await Blog.find(filter)
      .sort({ publishedAt: -1 })
      .limit(limit)
      .select(
        "title slug excerpt category coverImage author views readTime publishedAt",
      )
      .populate("author", "name avatar")
      .lean();

    const data = blogs.map((blog: any) => ({
      id: blog._id.toString(),
      category: blog.category || "General",
      title: blog.title,
      slug: blog.slug,
      description: blog.excerpt || "",
      author: blog.author?.name || "Unknown",
      date: blog.publishedAt
        ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "",
      views: formatViews(blog.views),
      readTime: `${blog.readTime ?? 0} min`,
      imageUrl: blog.coverImage?.url || "",
    }));

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("getPublishedBlogs error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch blogs" });
  }
};

/**
 * GET /api/blog/:slug
 * Used by the post page the cards link to.
 */
export const getBlogBySlugLanding = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug, status: "PUBLISHED" })
      .populate("author", "name avatar")
      .populate("coAuthors", "name avatar")
      .lean();

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error("getBlogBySlug error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch blog" });
  }
};

function formatViews(n: number): string {
  if (!n) return "0";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

/**
 * Wire these up in your router, e.g.:
 *
 * import { Router } from "express";
 * import { getPublishedBlogs, getBlogBySlug } from "../controllers/blog.controller.js";
 *
 * const router = Router();
 * router.get("/blog/published", getPublishedBlogs);
 * router.get("/blog/:slug", getBlogBySlug);
 *
 * export default router;
 */
