import React from "react";

/**
 * HeroStats
 * Pixel-perfect clone of the "Empowering global / thinkers / & researchers" hero section.
 *
 * Icon placeholders:
 * Each stat has an `icon` slot (React.ReactNode). Drop your own SVG/icon component
 * into the `icon` field of the `stats` array below, sized to fill a 24x24 box.
 */

interface Stat {
    icon: React.ReactNode;
    value: string;
    label: string;
}

const IconPlaceholder = () => <div className="h-6 w-6" aria-hidden="true" />;

const stats: Stat[] = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M26.9995 6.41604C27.6119 6.14846 28.2883 6 28.9995 6C31.7609 6 33.9995 8.23858 33.9995 11C33.9995 12.6356 33.2141 14.0878 31.9999 15" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M37.2496 32.0016C38.7684 32.0016 39.9996 30.719 39.9996 29.137C39.9996 25.9186 36.6668 22.7002 31 22.082" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20 22.002C23.3137 22.002 26 19.3157 26 16.002C26 12.6882 23.3137 10.002 20 10.002C16.6863 10.002 14 12.6882 14 16.002C14 19.3157 16.6863 22.002 20 22.002Z" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20 28.002C12.5 28.002 8 32.2878 8 36.5734C8 38.467 9.34314 40.002 11 40.002H29C30.6568 40.002 32 38.467 32 36.5734C32 32.2878 27.5 28.002 20 28.002Z" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>,
        value: "2,245,341",
        label: "Active Contributors",
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M8.63604 39.364C6 36.728 6 32.4852 6 24C6 15.5147 6 11.2721 8.63604 8.63604C11.2721 6 15.5147 6 24 6C32.4852 6 36.728 6 39.364 8.63604C42 11.2721 42 15.5147 42 24C42 32.4852 42 36.728 39.364 39.364C36.728 42 32.4852 42 24 42C15.5147 42 11.2721 42 8.63604 39.364Z" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14 28L19.5858 22.4142C20.3668 21.6332 21.6332 21.6332 22.4142 22.4142L25.5858 25.5858C26.3668 26.3668 27.6332 26.3668 28.4142 25.5858L34 20" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>,
        value: "46,328",
        label: "Topics Explored",
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M25 44C19.3431 44 16.5147 44 14.7574 42.2426C13 40.4852 13 37.6568 13 32V22C13 16.3431 13 13.5147 14.7574 11.7574C16.5147 10 19.3431 10 25 10H29C34.6568 10 37.4852 10 39.2426 11.7574C41 13.5147 41 16.3431 41 22V26" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13 38C9.6863 38 7 35.3138 7 32V16C7 10.3431 7 7.51472 8.75736 5.75736C10.5147 4 13.3431 4 19 4H29.0008C32.3144 4.00002 35.0008 6.68638 35.0008 10.0001" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20.002 26H26M20.002 18H34.002" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M38.2805 40.3018L42 44M40.4 35.2C40.4 31.2235 37.1765 28 33.2 28C29.2235 28 26 31.2235 26 35.2C26 39.1765 29.2235 42.4 33.2 42.4C37.1765 42.4 40.4 39.1765 40.4 35.2Z" stroke="#2563EB" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>,
        value: "828,867",
        label: "Published Papers",
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M38.9844 42H14.9844C10.2703 42 7.9133 42 6.44884 40.5356C4.98438 39.071 4.98438 36.714 4.98438 32V16C4.98438 11.286 4.98438 8.92894 6.44884 7.46446C7.9133 6 10.2703 6 14.9844 6H24.9844C29.6984 6 32.0554 6 33.52 7.46446C34.9844 8.92894 34.9844 11.286 34.9844 16" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M23.9844 12H15.9844C14.0988 12 13.1559 12 12.5702 12.5858C11.9844 13.1716 11.9844 14.1144 11.9844 16C11.9844 17.8856 11.9844 18.8284 12.5702 19.4142C13.1559 20 14.0988 20 15.9844 20H23.9844C25.87 20 26.8128 20 27.3986 19.4142C27.9844 18.8284 27.9844 17.8856 27.9844 16C27.9844 14.1144 27.9844 13.1716 27.3986 12.5858C26.8128 12 25.87 12 23.9844 12Z" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.9844 28H27.9844" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.9844 36H21.9844" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M34.9844 16H36.9844C39.8128 16 41.227 16 42.1056 16.8787C42.9844 17.7574 42.9844 19.1716 42.9844 22V38C42.9844 40.2092 41.1936 42 38.9844 42C36.7752 42 34.9844 40.2092 34.9844 38V16Z" stroke="#2563EB" stroke-width="3" stroke-linejoin="round" />
        </svg>,
        value: "1,926,436",
        label: "Blog Insights",
    },
];

const HeroStats: React.FC = () => {
    return (
        <section className="w-full px-6 py-12 sm:px-10 lg:px-16">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
                {/* Left: Heading */}
                <div className="max-w-xl">
                    <h1 className="text-[clamp(1.9rem,4.2vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-slate-900">
                        Empowering global
                        <em className="italic font-semibold ml-2">thinkers</em>
                        <br />
                        &amp; <em className="italic font-semibold">researchers</em>
                    </h1>
                    <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-slate-500">
                        Bringing rigorous research and insightful commentary to a global
                        community
                    </p>
                </div>

                {/* Right: Stats grid */}
                <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:gap-x-16 lg:gap-x-20">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-blue-600">
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-lg font-bold leading-tight text-slate-900 sm:text-xl">
                                    {stat.value}
                                </div>
                                <div className="mt-0.5 whitespace-nowrap text-sm text-slate-500">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroStats;