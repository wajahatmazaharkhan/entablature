// src/components/AboutPage.tsx
//
// Static content for the /about route. No client JS is required — Astro
// renders React to plain HTML at build time when no `client:*` directive
// is used, so this ships as zero extra JS, in keeping with the "no feeds,
// no noise" positioning of the product itself.
import React from 'react';
import worldMap from '../assets/world-map.png';
import {
    Globe2,
    ShieldCheck,
    BookOpenCheck,
    Users,
    PenLine,
    EyeOff,
    ChevronDown,
} from 'lucide-react';

const VALUES = [
    {
        icon: ShieldCheck,
        title: 'Editorial integrity',
        body: 'Every piece is read and judged by an editor before it goes live. Publication is earned, not automatic.',
    },
    {
        icon: Globe2,
        title: 'Global by design',
        body: "Good research doesn't belong to one institution or one country. We publish work on its merit, wherever it comes from.",
    },
    {
        icon: BookOpenCheck,
        title: 'Built for reading',
        body: 'Long-form, typography-first pages designed so the writing is the interface — nothing competing for attention beside it.',
    },
    {
        icon: EyeOff,
        title: 'No algorithmic feed',
        body: "There's no engagement ranking deciding what you see first. You read what you came to read.",
    },
    {
        icon: PenLine,
        title: 'A real writing process',
        body: 'Researchers draft, revise, and resubmit in the same place they publish — not a form you fill out once and forget.',
    },
    {
        icon: Users,
        title: 'Open to independent work',
        body: "You don't need a university affiliation or a journal credential to submit. You need research worth reading.",
    },
];

const STEPS = [
    {
        title: 'Write',
        body: 'A researcher drafts their submission directly on the platform — no separate manuscript formatting, no email threads.',
    },
    {
        title: 'Review',
        body: 'An editor reads it for rigor, clarity, and whether it says something worth saying, and sends focused feedback back.',
    },
    {
        title: 'Revise',
        body: 'The researcher can revise and resubmit as many times as it takes to get the work ready — the process stays open, not one-shot.',
    },
    {
        title: 'Publish',
        body: 'Once approved, the work goes live on Entablature, discoverable to readers anywhere, with no distribution gatekeeping.',
    },
];

const FAQS = [
    {
        q: 'Who can publish on Entablature?',
        a: 'Anyone doing serious research — independent researchers, students, and academics alike. There is no institutional affiliation requirement; submissions are judged on the work itself.',
    },
    {
        q: 'How does editorial review actually work?',
        a: 'Every submission is read by an editor before publication. Editors evaluate for rigor, clarity, and whether the work has something genuine to contribute, and can send it back for revision rather than a flat rejection.',
    },
    {
        q: "What kind of research do you accept?",
        a: "We're deliberately broad on subject matter and narrow on quality: original research, structured analysis, and well-argued findings across fields. What we don't accept is unreviewed opinion dressed up as research.",
    },
    {
        q: 'Is it free to read and publish?',
        a: "Reading on Entablature is free, with no paywall between you and published research. There's no cost to submit work for editorial review.",
    },
    {
        q: 'How is this different from a blog or a journal?',
        a: "It sits between the two on purpose. Like a blog, it's fast to publish to and open to independent writers. Like a journal, nothing goes live without an editor reading it first. Unlike either, there's no feed, no comments, and no engagement metrics attached to the work.",
    },
];

const AboutPage = () => {
    return (
        <div className="w-full flex flex-col items-center">
            {/* Hero */}
            <section className="w-full max-w-3xl mx-auto px-4 pt-16 sm:pt-24 lg:pt-28 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.15] text-neutral-900 dark:text-neutral-100">
                    A global home for research{' '}
                    <span className="font-normal italic font-literata">worth</span> reading
                </h1>
                <p className="mt-6 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                    Entablature is a publishing platform built for research, not for
                    engagement. Researchers write and submit their work, editors review it
                    on its merits, and what's approved is published for anyone, anywhere,
                    to read.
                </p>
            </section>

            {/* Global reach */}
            <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-20 sm:mt-28">
                <div className="relative rounded-3xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 overflow-hidden">
                    <div className="px-6 sm:px-12 pt-12 sm:pt-16 text-center max-w-xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                            Research doesn't belong to one place
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
                            Entablature isn't tied to a single university, publisher, or
                            region. A submission is read on what it argues and how well it
                            argues it — not on where it was written.
                        </p>
                    </div>
                    <div className="mt-8 sm:mt-10 flex justify-center px-4 pb-4">
                        <img
                            className="w-full max-w-2xl h-auto opacity-90 dark:opacity-80 dark:invert-0"
                            src={worldMap.src}
                            alt="World map"
                        />
                    </div>
                </div>
            </section>

            {/* Mission statement */}
            <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 mt-24 sm:mt-32 text-center">
                <p className="text-2xl sm:text-3xl md:text-[34px] leading-snug font-semibold text-neutral-900 dark:text-neutral-100">
                    We built Entablature around one idea:{' '}
                    <span className="italic font-literata font-normal">
                        good research should travel as far as it deserves to
                    </span>{' '}
                    — not just as far as an algorithm decides.
                </p>
            </section>

            {/* Values */}
            <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-24 sm:mt-32">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        What we stand for
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
                        A short list of the things we won't compromise on as the platform
                        grows.
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                    {VALUES.map(({ icon: Icon, title, body }) => (
                        <div key={title} className="flex flex-col items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-primary/10 dark:bg-brand-primary/15 flex items-center justify-center text-brand-primary">
                                <Icon className="w-5 h-5" strokeWidth={1.75} />
                            </div>
                            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-[15px]">
                                {title}
                            </h3>
                            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                                {body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 mt-24 sm:mt-32">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        From draft to published
                    </h2>
                    <p className="mt-3 text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
                        The same four steps, every time — no shortcuts, no exceptions.
                    </p>
                </div>

                <ol className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {STEPS.map((step, i) => (
                        <li key={step.title} className="flex flex-col gap-3">
                            <span className="text-sm font-semibold text-brand-primary tabular-nums">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-[15px]">
                                {step.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                                {step.body}
                            </p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Community */}
            <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 mt-24 sm:mt-32 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                    Who it's for
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                    Entablature is for independent researchers working without an
                    institutional platform, for students publishing their first serious
                    work, and for academics who want a faster, more direct place to reach
                    readers than a traditional journal allows. On the reading side, it's
                    for anyone who wants research explained clearly, without wading
                    through a feed to find it.
                </p>
            </section>

            {/* FAQ */}
            <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 mt-24 sm:mt-32 pb-4">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        Common questions
                    </h2>
                </div>

                <div className="mt-12 divide-y divide-neutral-200 dark:divide-neutral-800">
                    {FAQS.map(({ q, a }) => (
                        <details key={q} className="group py-5">
                            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-medium text-neutral-900 dark:text-neutral-100 text-[15px] sm:text-base [&::-webkit-details-marker]:hidden">
                                {q}
                                <ChevronDown
                                    className="w-4 h-4 shrink-0 text-neutral-400 transition-transform duration-200 group-open:rotate-180"
                                    strokeWidth={1.75}
                                />
                            </summary>
                            <p className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 pr-8">
                                {a}
                            </p>
                        </details>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutPage;