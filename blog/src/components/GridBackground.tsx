import React from 'react';

// Same geometry as before — cells, cross rhythm and proportions are unchanged
const FINE = 83.77; // one grid cell
const CROSS_TILE = FINE * 8; // 670.16 — one cross repeat unit
const CROSS_OFFSET = FINE * 4; // 335.08 — diagonal offset between interleaved cross layers
const ARM = 16.9; // half-length of each cross arm

const fineTile = (stroke: string) =>
    encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${FINE}" height="${FINE}" viewBox="0 0 ${FINE} ${FINE}" shape-rendering="geometricPrecision">` +
        `<path d="M0 0H${FINE}M0 0V${FINE}" stroke="${stroke}" stroke-width="0.85" vector-effect="non-scaling-stroke"/>` +
        `</svg>`,
    );

// Cross now has a tiny centre dot so each intersection reads as a glint
const crossTile = (stroke: string) => {
    const c = CROSS_TILE / 2;
    return encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${CROSS_TILE}" height="${CROSS_TILE}" viewBox="0 0 ${CROSS_TILE} ${CROSS_TILE}" shape-rendering="geometricPrecision">` +
        `<path d="M${c} ${c - ARM}V${c + ARM}M${c - ARM} ${c}H${c + ARM}" stroke="${stroke}" stroke-width="1.1" stroke-linecap="round" vector-effect="non-scaling-stroke"/>` +
        `<circle cx="${c}" cy="${c}" r="1.6" fill="${stroke}"/>` +
        `</svg>`,
    );
};

// Accent colours — swap these RGB triplets to match your brand
const themes = {
    light: {
        fine: fineTile('rgba(76,76,76,0.13)'),
        cross: crossTile('rgba(76,76,76,0.16)'),
        fineBright: fineTile('rgba(99,102,241,0.40)'),
        crossBright: crossTile('rgba(99,102,241,0.85)'),
        glow: [
            'radial-gradient(60% 55% at 50% 0%, rgba(99,102,241,0.22) 0%, transparent 70%)',
            'radial-gradient(35% 40% at 10% 6%, rgba(56,189,248,0.16) 0%, transparent 70%)',
            'radial-gradient(35% 40% at 90% 6%, rgba(217,70,239,0.14) 0%, transparent 70%)',
        ].join(', '),
    },
    dark: {
        fine: fineTile('rgba(255,255,255,0.14)'),
        cross: crossTile('rgba(255,255,255,0.16)'),
        fineBright: fineTile('rgba(165,180,252,0.45)'),
        crossBright: crossTile('rgba(199,210,254,0.95)'),
        glow: [
            'radial-gradient(60% 55% at 50% 0%, rgba(129,140,248,0.30) 0%, transparent 70%)',
            'radial-gradient(35% 40% at 10% 6%, rgba(56,189,248,0.20) 0%, transparent 70%)',
            'radial-gradient(35% 40% at 90% 6%, rgba(217,70,239,0.18) 0%, transparent 70%)',
        ].join(', '),
    },
};

type Theme = typeof themes.light;

const VIGNETTE_MASK =
    'linear-gradient(to bottom, black 0%, black 65%, transparent 100%)';

const SWEEP_MASK =
    'linear-gradient(105deg, transparent 35%, black 50%, transparent 65%)';

const vignette: React.CSSProperties = {
    maskImage: VIGNETTE_MASK,
    WebkitMaskImage: VIGNETTE_MASK,
};

const url = (svg: string) => `url("data:image/svg+xml,${svg}")`;

const gridStyle = (fineSvg: string, crossSvg: string): React.CSSProperties => ({
    backgroundImage: [url(fineSvg), url(crossSvg), url(crossSvg)].join(', '),
    backgroundSize: `${FINE}px ${FINE}px, ${CROSS_TILE}px ${CROSS_TILE}px, ${CROSS_TILE}px ${CROSS_TILE}px`,
    backgroundPosition: `0 0, 0 0, ${CROSS_OFFSET}px ${CROSS_OFFSET}px`,
    backgroundRepeat: 'repeat, repeat, repeat',
});

const twinkleStyle = (
    crossSvg: string,
    offset: number,
    animation: string,
): React.CSSProperties => ({
    backgroundImage: url(crossSvg),
    backgroundSize: `${CROSS_TILE}px ${CROSS_TILE}px`,
    backgroundPosition: `${offset}px ${offset}px`,
    backgroundRepeat: 'repeat',
    opacity: 0.5,
    animation,
    ...vignette,
});

const shimmerStyle = (t: Theme): React.CSSProperties => ({
    ...gridStyle(t.fineBright, t.crossBright),
    maskImage: SWEEP_MASK,
    WebkitMaskImage: SWEEP_MASK,
    maskSize: '300% 100%',
    WebkitMaskSize: '300% 100%',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: '0% 0',
    WebkitMaskPosition: '0% 0',
    animation: 'gb-sweep 9s ease-in-out infinite',
});

const CSS = `
@keyframes gb-sweep {
    0%   { mask-position: 100% 0; -webkit-mask-position: 100% 0; }
    55%  { mask-position: 0% 0;   -webkit-mask-position: 0% 0; }
    100% { mask-position: 0% 0;   -webkit-mask-position: 0% 0; }
}
@keyframes gb-twinkle {
    0%, 100% { opacity: 0.1; }
    50%      { opacity: 1; }
}
@keyframes gb-breathe {
    0%, 100% { opacity: 0.75; }
    50%      { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
    .gb-anim { animation: none !important; }
}
`;

const Layers = ({ t }: { t: Theme }) => (
    <>
        {/* ambient colour glow behind the hero */}
        <div
            className="gb-anim absolute inset-0"
            style={{
                backgroundImage: t.glow,
                animation: 'gb-breathe 8s ease-in-out infinite',
            }}
        />

        {/* base grid */}
        <div
            className="absolute inset-0"
            style={{ ...gridStyle(t.fine, t.cross), ...vignette }}
        />

        {/* twinkling cross glints, two interleaved layers out of phase */}
        <div
            className="gb-anim absolute inset-0"
            style={twinkleStyle(
                t.crossBright,
                0,
                'gb-twinkle 5s ease-in-out infinite',
            )}
        />
        <div
            className="gb-anim absolute inset-0"
            style={twinkleStyle(
                t.crossBright,
                CROSS_OFFSET,
                'gb-twinkle 5s ease-in-out -2.5s infinite',
            )}
        />

        {/* diagonal light sweep across the grid */}
        <div className="absolute inset-0" style={vignette}>
            <div className="gb-anim absolute inset-0" style={shimmerStyle(t)} />
        </div>
    </>
);

const GridBackground = () => {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 -z-10 w-full overflow-hidden dark:bg-brand-dark"
            style={{ aspectRatio: '1440 / 1271' }}
        >
            <style>{CSS}</style>
            <div className="absolute inset-0 block dark:hidden">
                <Layers t={themes.light} />
            </div>
            <div className="absolute inset-0 hidden dark:block">
                <Layers t={themes.dark} />
            </div>
        </div>
    );
};

export default GridBackground;