import React, { useEffect, useRef, useState } from 'react';
import { Eye } from 'lucide-react';

/**
 * "Ideas worth sharing" — a pinned, scroll-reveal grid.
 */

interface Idea {
    id: string;
    title: string;
    author: string;
    date: string;
    views: string;
    imageUrl: string;
}

interface GradientPalette {
    from: string;
    to: string;
}

const GRADIENT_PALETTES: GradientPalette[] = [
    { from: '#7DD3FC', to: '#F0ABFC' },
    { from: '#FDE68A', to: '#F87171' },
    { from: '#86EFAC', to: '#60A5FA' },
    { from: '#C4B5FD', to: '#FCA5A5' },
    { from: '#5EEAD4', to: '#FBCFE8' },
    { from: '#FDBA74', to: '#A5B4FC' },
];

const ideas: Idea[] = [
    {
        id: 'idea-1',
        title: 'AI Ethics: Navigating the Moral Landscape of Machine Learning',
        author: 'Dr. Emily Tran',
        date: 'Oct 5, 2026',
        views: '45.3k',
        imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-2',
        title: 'Sustainable Tech: Innovations for a Greener Future',
        author: 'Prof. John Baker',
        date: 'Nov 12, 2026',
        views: '32.1k',
        imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-3',
        title: 'Blockchain Beyond Bitcoin: Applications in Various Industries',
        author: 'Dr. Sarah Kim',
        date: 'Sep 9, 2026',
        views: '27.4k',
        imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-4',
        title: 'Augmented Reality: Enhancing Our Perception of Reality',
        author: 'Mr. Alex Chen',
        date: 'Dec 1, 2026',
        views: '50.2k',
        imageUrl: 'https://images.unsplash.com/photo-1538388149542-5e24932d11a8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGF1Z21lbnRlZCUyMHJlYWxpdHl8ZW58MHx8MHx8fDA%3D'
    },
    {
        id: 'idea-5',
        title: 'Cybersecurity: Protecting Digital Assets in the Modern Age',
        author: 'Ms. Rachel Green',
        date: 'Jan 15, 2027',
        views: '40.9k',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-6',
        title: 'The Future of Work: Remote Collaboration and Digital Nomads',
        author: 'Mr. Tim O\u2019Reilly',
        date: 'Feb 20, 2027',
        views: '38.7k',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-7',
        title: 'Neural Interfaces: Bridging Minds and Machines',
        author: 'Dr. Priya Nair',
        date: 'Mar 30, 2027',
        views: '55.8k',
        imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-8',
        title: 'Ethical AI: Balancing Innovation with Responsibility',
        author: 'Prof. Mark Wilson',
        date: 'Apr 25, 2027',
        views: '22.3k',
        imageUrl: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=3268&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        id: 'idea-9',
        title: 'Smart Cities: The Integration of Technology in Urban Planning',
        author: 'Mr. David Smith',
        date: 'May 16, 2027',
        views: '30.5k',
        imageUrl: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-10',
        title: 'Machine Learning: Unlocking Patterns in Big Data',
        author: 'Dr. Angela Wright',
        date: 'Jun 12, 2027',
        views: '41.0k',
        imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-11',
        title: 'Quantum Computing: Preparing for a Post-Classical World',
        author: 'Dr. Amara Osei',
        date: 'Jul 3, 2027',
        views: '17.9k',
        imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-12',
        title: 'Robotics at Scale: From Warehouse Floors to Home Assistants',
        author: 'Dr. Laura Simmons',
        date: 'Jul 21, 2027',
        views: '29.7k',
        imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-13',
        title: 'Data Privacy in a Hyperconnected World',
        author: 'Dr. Fatima Al-Sayed',
        date: 'Aug 9, 2027',
        views: '16.5k',
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-14',
        title: 'Space Tech: The New Economics of Low Earth Orbit',
        author: 'Dr. Naomi Patel',
        date: 'Sep 2, 2027',
        views: '9.8k',
        imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-15',
        title: 'Biotech Breakthroughs: Engineering the Next Generation of Medicine',
        author: 'Dr. Oliver Bennett',
        date: 'Sep 24, 2027',
        views: '27.6k',
        imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-16',
        title: 'FinTech Frontiers: Algorithmic Trust in Financial Systems',
        author: 'Ines Duarte',
        date: 'Oct 11, 2027',
        views: '12.9k',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-17',
        title: 'Climate Modeling: Simulating the Planet\u2019s Next Century',
        author: 'Dr. Wei Zhang',
        date: 'Oct 30, 2027',
        views: '20.3k',
        imageUrl: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-18',
        title: 'Edge Computing: Bringing Intelligence Closer to the Source',
        author: 'Mr. Marcus Webb',
        date: 'Nov 19, 2027',
        views: '19.6k',
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-19',
        title: 'Digital Sovereignty: Rethinking Data Borders in the Cloud Era',
        author: 'Sam Altman',
        date: 'Dec 8, 2027',
        views: '51.2k',
        imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-20',
        title: 'Autonomous Systems: Trust, Testing, and the Long Tail of Edge Cases',
        author: 'Dr. Henrik Voss',
        date: 'Dec 27, 2027',
        views: '14.3k',
        imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-21',
        title: 'Synthetic Biology: Programming Cells Like Software',
        author: 'Dr. Meera Iyer',
        date: 'Jan 14, 2028',
        views: '18.2k',
        imageUrl: 'https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-22',
        title: 'The Semiconductor Race: Who Controls the Chips Controls the Future',
        author: 'Mr. Kenji Watanabe',
        date: 'Feb 2, 2028',
        views: '46.5k',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-23',
        title: 'Voice Interfaces: Designing for a Screenless Future',
        author: 'Ms. Clara Dubois',
        date: 'Feb 21, 2028',
        views: '13.7k',
        imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-24',
        title: 'Digital Twins: Simulating Reality Before Building It',
        author: 'Dr. Anton Volkov',
        date: 'Mar 9, 2028',
        views: '21.4k',
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-25',
        title: 'Green Hydrogen: The Fuel Powering the Next Energy Shift',
        author: 'Dr. Ola Bergström',
        date: 'Mar 28, 2028',
        views: '24.9k',
        imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-26',
        title: 'Wearable Health Tech: Continuous Monitoring, Continuous Trust',
        author: 'Dr. Grace Adeyemi',
        date: 'Apr 16, 2028',
        views: '31.6k',
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-27',
        title: 'Open Source AI: Who Should Get to Build the Models?',
        author: 'Mr. Noah Fischer',
        date: 'May 5, 2028',
        views: '39.3k',
        imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-28',
        title: 'Underwater Data Centers: Cooling Compute with the Ocean',
        author: 'Dr. Ravi Deshmukh',
        date: 'May 24, 2028',
        views: '11.8k',
        imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-29',
        title: 'Personalized Learning: Adaptive Curricula at Classroom Scale',
        author: 'Prof. Helena Schmidt',
        date: 'Jun 12, 2028',
        views: '15.1k',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=380&fit=crop',
    },
    {
        id: 'idea-30',
        title: 'The Circular Economy: Designing Products That Never Become Waste',
        author: 'Ms. Isabel Rocha',
        date: 'Jul 1, 2028',
        views: '28.0k',
        imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&h=380&fit=crop',
    },
];

const IdeaCard = ({ idea, index }: { idea: Idea; index: number }) => {
    const palette = GRADIENT_PALETTES[index % GRADIENT_PALETTES.length];

    return (
        <article className="flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04] dark:bg-[#111114] dark:ring-white/[0.06]">
            <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                    src={idea.imageUrl}
                    alt={idea.title}
                    draggable={false}
                    loading="lazy"
                    className="h-full w-full select-none object-cover"
                />
            </div>

            <div
                className="relative flex flex-1 flex-col justify-between px-4 py-4 sm:px-5 sm:py-5"
                style={{
                    backgroundImage: `radial-gradient(circle at 100% 0%, ${palette.from}3d, transparent 58%), radial-gradient(circle at 100% 100%, ${palette.to}3d, transparent 58%)`,
                }}
            >
                <h3 className="line-clamp-3 text-[14px] font-semibold leading-snug text-[#151515] sm:text-[15px] md:text-[16px] dark:text-white">
                    {idea.title}
                </h3>

                <div className="mt-3">
                    <p className="truncate text-[12px] font-semibold text-[#151515] sm:text-[13px] dark:text-white">
                        {idea.author}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-[#73736F] sm:text-[12px] dark:text-brand-gray">
                        <span className="truncate">{idea.date}</span>
                        <span className="text-[#D0D0CB] dark:text-white/20">&bull;</span>
                        <span className="flex shrink-0 items-center gap-1">
                            <Eye className="h-3 w-3" strokeWidth={1.75} />
                            {idea.views}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
};

const IdeasGrid = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null); // NEW: the flex-1 overflow-hidden viewport
    const contentRef = useRef<HTMLDivElement>(null);   // the grid itself
    const [maxTranslate, setMaxTranslate] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    // 1) MEASURE how far the grid overflows its visible container.
    //    This is the piece that was missing — maxTranslate was never set,
    //    so it stayed 0 forever and nothing downstream could ever move.
    useEffect(() => {
        const measure = () => {
            if (!contentRef.current || !containerRef.current) return;
            const contentHeight = contentRef.current.scrollHeight;
            const containerHeight = containerRef.current.clientHeight;
            const overflow = Math.max(0, contentHeight - containerHeight);
            setMaxTranslate(overflow);
        };

        measure();

        // Re-measure on resize and on any content size change
        // (e.g. images finishing layout, responsive column changes).
        const ro = new ResizeObserver(measure);
        if (contentRef.current) ro.observe(contentRef.current);
        if (containerRef.current) ro.observe(containerRef.current);
        window.addEventListener('resize', measure);

        return () => {
            ro.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, []);

    // 2) DRIVE translateY off scroll position — single source of truth,
    //    prefers Lenis's scroll event if present, falls back to native.
    //    (Previously there were two separate effects both doing this,
    //    which would double-fire once maxTranslate was non-zero.)
    useEffect(() => {
        if (maxTranslate <= 0) {
            setTranslateY(0);
            return;
        }

        let rafId = 0;
        const lenis = (window as any).__lenis;

        const update = () => {
            if (!wrapperRef.current) return;
            const rect = wrapperRef.current.getBoundingClientRect();
            const scrollableDistance = rect.height - window.innerHeight;
            if (scrollableDistance <= 0) return;
            const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1);
            setTranslateY(progress * maxTranslate);
        };

        const onNativeScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(update);
        };

        if (lenis) {
            lenis.on('scroll', update);
            update();
            return () => lenis.off('scroll', update);
        }

        update();
        window.addEventListener('scroll', onNativeScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onNativeScroll);
            cancelAnimationFrame(rafId);
        };
    }, [maxTranslate]);

    return (
        <div
            ref={wrapperRef}
            style={{ height: `calc(100vh + ${maxTranslate}px)` }}
            className="relative w-full"
        >
            <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden py-10 sm:py-14">
                <div className="mx-auto w-full max-w-[1600px] px-5 text-center sm:px-8 md:px-12 lg:px-16">
                    <h2 className="text-[26px] leading-tight text-[#151515] sm:text-[32px] md:text-[40px] dark:text-white">
                        Ideas worth <span className="font-serif italic">sharing</span>
                    </h2>
                    <p className="mt-2 text-[15px] text-[#73736F] sm:text-[16px] md:text-[18px] dark:text-brand-gray">
                        Thoughts and insights on the ideas shaping our world.
                    </p>
                </div>

                <div
                    ref={containerRef}
                    className="mx-auto mt-8 w-full max-w-[1600px] flex-1 overflow-hidden px-5 sm:mt-10 sm:px-8 md:px-12 lg:px-16"
                >
                    <div
                        ref={contentRef}
                        className="grid grid-cols-2 gap-4 will-change-transform sm:grid-cols-3 sm:gap-6 md:grid-cols-4 md:gap-7 xl:grid-cols-5 xl:gap-8"
                        style={{ transform: `translateY(-${translateY}px)` }}
                    >
                        {ideas.map((idea, index) => (
                            <IdeaCard key={idea.id} idea={idea} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdeasGrid;