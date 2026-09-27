import React, { useEffect, useState } from 'react';
import { Eye, Clock } from 'lucide-react';
import { fetchPublishedBlogs, type BlogCardDTO } from '@/service/blog.service';
// ^ adjust this import path to wherever fetchPublishedBlogs actually lives in your project

/**
 * "Research worth reading" — auto-scrolling, two-row marquee carousel.
 * Now backed by the /blog/published/landing API instead of static data.
 *
 * - Fetches once on mount, splits the flat list into two halves for the
 *   two rows (first half -> row one, second half -> row two).
 * - Each card is a full <a href="/papers/:slug"> — clicking anywhere on
 *   the card navigates using the slug from the API response.
 * - Loading -> skeleton cards. Fetch failure -> inline message + retry.
 *
 * Design notes (unchanged from the static version):
 * - Each card is a landscape tile: a square-ish photo on the left, and a
 *   content panel on the right whose ONLY decoration is a soft radial
 *   gradient bleeding in from the top-right and bottom-right corners.
 * - Two independent rows scroll left continuously and pause on hover/focus.
 * - The list is duplicated once per row so the loop is seamless.
 * - No two adjacent cards ever share the same gradient palette.
 * - Ambient breathing glow + cursor-following spotlight per card.
 */

interface GradientPalette {
    from: string;
    to: string;
}

/** Soft pastel corner-gradient palettes — cycled so neighbors never repeat. */
const GRADIENT_PALETTES: GradientPalette[] = [
    { from: '#7DD3FC', to: '#F0ABFC' }, // sky -> fuchsia
    { from: '#FDE68A', to: '#F87171' }, // amber -> rose
    { from: '#86EFAC', to: '#60A5FA' }, // green -> blue
    { from: '#C4B5FD', to: '#FCA5A5' }, // violet -> red
    { from: '#5EEAD4', to: '#FBCFE8' }, // teal -> pink
    { from: '#FDBA74', to: '#A5B4FC' }, // orange -> indigo
];

/** Ambient section glow. */
const GLOW_LIGHT = [
    'radial-gradient(45% 40% at 18% 52%, rgba(99,102,241,0.14) 0%, transparent 70%)',
    'radial-gradient(40% 40% at 82% 62%, rgba(217,70,239,0.11) 0%, transparent 70%)',
].join(', ');

const GLOW_DARK = [
    'radial-gradient(45% 40% at 18% 52%, rgba(129,140,248,0.20) 0%, transparent 70%)',
    'radial-gradient(40% 40% at 82% 62%, rgba(217,70,239,0.15) 0%, transparent 70%)',
].join(', ');

const SPOTLIGHT_LIGHT =
    'radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.14), transparent 70%)';
const SPOTLIGHT_DARK =
    'radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(165,180,252,0.14), transparent 70%)';

const CarouselCard = ({ post, index }: { post: BlogCardDTO; index: number }) => {
    const palette = GRADIENT_PALETTES[index % GRADIENT_PALETTES.length];

    // Feeds the hover spotlight — only writes two CSS vars, no re-render.
    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };

    return (
        // Swap this <a> for <Link to={...}> (react-router-dom) or
        // <Link href={...}> (next/link) for client-side navigation instead
        // of a full page reload.
        <a
            href={`/papers/${post.slug}`}
            onMouseMove={handleMouseMove}
            aria-label={post.title}
            className="group relative flex h-[220px] w-[300px] shrink-0 overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04] transition-[box-shadow,--tw-ring-color] duration-300 hover:cursor-pointer hover:shadow-[0_10px_34px_-10px_rgba(99,102,241,0.45)] hover:ring-indigo-400/50 sm:h-[250px] sm:w-[380px] md:h-[280px] md:w-[440px] dark:bg-[#111114] dark:ring-white/[0.06] dark:hover:ring-indigo-300/40"
        >
            {/* Photo — plain, no gradient */}
            <div className="w-[36%] shrink-0 overflow-hidden">
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    draggable={false}
                    loading="lazy"
                    className="h-full w-full select-none object-cover"
                />
            </div>

            {/* Content panel — gradient bleeds in only from the top-right and bottom-right corners */}
            <div
                className="relative flex min-w-0 flex-1 flex-col justify-between px-4 py-4 sm:px-5 sm:py-5"
                style={{
                    backgroundImage: `radial-gradient(circle at 100% 0%, ${palette.from}3d, transparent 58%), radial-gradient(circle at 100% 100%, ${palette.to}3d, transparent 58%)`,
                }}
            >
                <div>
                    <span className="inline-block rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-600 sm:text-[11px] dark:bg-blue-500/10 dark:text-blue-300">
                        {post.category}
                    </span>

                    <h3 className="mt-2.5 line-clamp-2 text-[14px] font-semibold leading-snug text-[#151515] sm:mt-3 sm:text-[16px] md:text-[18px] dark:text-white">
                        {post.title}
                    </h3>

                    <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-[#73736F] sm:mt-2 sm:text-[13px] md:text-[14px] dark:text-brand-gray">
                        {post.description}
                    </p>
                </div>

                <div>
                    <p className="truncate text-[12px] font-semibold text-[#151515] sm:text-[13px] dark:text-white">
                        {post.author}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-[#73736F] sm:text-[12px] dark:text-brand-gray">
                        <span className="truncate">{post.date}</span>
                        <span className="text-[#D0D0CB] dark:text-white/20">&bull;</span>
                        <span className="flex shrink-0 items-center gap-1">
                            <Eye className="h-3 w-3" strokeWidth={1.75} />
                            {post.views}
                        </span>
                        <span className="text-[#D0D0CB] dark:text-white/20">&bull;</span>
                        <span className="flex shrink-0 items-center gap-1">
                            <Clock className="h-3 w-3" strokeWidth={1.75} />
                            {post.readTime}
                        </span>
                    </div>
                </div>
            </div>

            {/* Cursor-following spotlight (light + dark variants) */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:hidden"
                style={{ backgroundImage: SPOTLIGHT_LIGHT }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:block"
                style={{ backgroundImage: SPOTLIGHT_DARK }}
            />
        </a>
    );
};

const CarouselSkeletonCard = () => (
    <div className="h-[220px] w-[300px] shrink-0 animate-pulse rounded-2xl bg-gray-100 sm:h-[250px] sm:w-[380px] md:h-[280px] md:w-[440px] dark:bg-white/5" />
);

const CarouselRow = ({
    posts,
    durationSeconds,
    reverse = false,
}: {
    posts: BlogCardDTO[];
    durationSeconds: number;
    reverse?: boolean;
}) => {
    const [isPaused, setIsPaused] = useState(false);
    // Duplicate the row once so translateX(-50%) is a seamless loop point.
    const doubled = [...posts, ...posts];

    return (
        <div
            data-carousel-row
            className="w-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
        >
            <div
                className="carousel-row-track flex w-max gap-4 sm:gap-5 md:gap-6"
                style={{
                    animationName: reverse ? 'carousel-scroll-reverse' : 'carousel-scroll',
                    animationDuration: `${durationSeconds}s`,
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                    animationPlayState: isPaused ? 'paused' : 'running',
                }}
            >
                {doubled.map((post, index) => (
                    <CarouselCard key={`${post.id}-${index}`} post={post} index={index} />
                ))}
            </div>
        </div>
    );
};

const Carousel = () => {
    const [blogs, setBlogs] = useState<BlogCardDTO[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const loadBlogs = () => {
        setError(null);
        setBlogs(null);
        fetchPublishedBlogs({ limit: 20 })
            .then(setBlogs)
            .catch(() => setError('Could not load research right now.'));
    };

    useEffect(() => {
        loadBlogs();
    }, []);

    // Split the flat API list into two halves for the two marquee rows.
    const mid = blogs ? Math.ceil(blogs.length / 2) : 0;
    const rowOnePosts = blogs?.slice(0, mid) ?? [];
    const rowTwoPosts = blogs?.slice(mid) ?? [];

    return (
        <div className="carousel-cursor-zone relative isolate mt-10 w-full max-w-full overflow-x-hidden">
            <style>{`
                @keyframes carousel-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                @keyframes carousel-scroll-reverse {
                    from { transform: translateX(-50%); }
                    to { transform: translateX(0); }
                }
                @keyframes carousel-breathe {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .carousel-row-track,
                    .carousel-anim { animation: none !important; }
                }
            `}</style>

            {/* Ambient glow behind the whole section */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                <div
                    className="carousel-anim absolute inset-0 dark:hidden"
                    style={{
                        backgroundImage: GLOW_LIGHT,
                        animation: 'carousel-breathe 8s ease-in-out infinite',
                    }}
                />
                <div
                    className="carousel-anim absolute inset-0 hidden dark:block"
                    style={{
                        backgroundImage: GLOW_DARK,
                        animation: 'carousel-breathe 8s ease-in-out infinite',
                    }}
                />
            </div>

            <div className="w-full max-w-full px-5 sm:px-8 md:px-16 lg:px-[220px]">
                <h2 className="text-[26px] font-bold leading-tight text-[#151515] sm:text-[32px] md:text-[40px] dark:text-white">
                    Research worth <span className="font-serif italic">reading</span>
                </h2>
                <p className="mt-2 text-[15px] text-[#73736F] sm:text-[16px] md:text-[18px] dark:text-brand-gray">
                    Explore research and evidence on the ideas shaping what comes next
                </p>
            </div>

            {error && (
                <div className="px-5 pt-8 sm:px-8 md:px-16 lg:px-[220px]">
                    <p className="text-[14px] text-red-500 dark:text-red-400">
                        {error}{' '}
                        <button onClick={loadBlogs} className="font-semibold underline underline-offset-2">
                            Retry
                        </button>
                    </p>
                </div>
            )}

            {!error && blogs === null && (
                <div className="mt-8 flex gap-4 overflow-hidden px-5 sm:mt-10 sm:gap-5 sm:px-8 md:gap-6 md:px-16 lg:px-[220px]">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <CarouselSkeletonCard key={i} />
                    ))}
                </div>
            )}

            {!error && blogs !== null && blogs.length > 0 && (
                <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:gap-5 md:gap-6">
                    <CarouselRow posts={rowOnePosts} durationSeconds={55} />
                    {rowTwoPosts.length > 0 && (
                        <CarouselRow posts={rowTwoPosts} durationSeconds={65} reverse />
                    )}
                </div>
            )}
        </div>
    );
};

export default Carousel;