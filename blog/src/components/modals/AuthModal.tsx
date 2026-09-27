import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';
import { stopLenis, startLenis } from '../../lib/lenis';

import illus from '../../assets/illus.png';
import { LOGO_URL } from '../../constants';

const THE_ENTABLATURE_LIGHT_LOGO = LOGO_URL;

interface DisplayProps {
    display: boolean;
    setDisplay: () => void;
    initialMode?: AuthMode;
}

type AuthMode = 'signup' | 'signin';

/* -------------------------------------------------------
   Google Icon
------------------------------------------------------- */

const GoogleIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="shrink-0"
    >
        <path
            fill="#ffffff"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
            fill="#ffffff"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
            fill="#ffffff"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        />
        <path
            fill="#ffffff"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        />
    </svg>
);

/* -------------------------------------------------------
   Google Auth Button
------------------------------------------------------- */

interface GoogleButtonProps {
    mode: AuthMode;
    onClick: () => void;
}

const GoogleButton = ({ mode, onClick }: GoogleButtonProps) => (
    <button
        type="button"
        onClick={onClick}
        className="
            group
            flex h-[54px] w-full
            items-center justify-center gap-3
            rounded-full
            bg-[#2864e8]
            px-6
            text-[16px] font-normal leading-none text-white
            shadow-[0_10px_24px_-10px_rgba(37,99,235,0.65)]
            transition-all duration-200
            hover:-translate-y-0.5 hover:bg-[#235bd4]
            hover:shadow-[0_14px_28px_-10px_rgba(37,99,235,0.75)]
            active:translate-y-0 active:scale-[0.985]
        "
    >
        <span>
            {mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}
        </span>
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            <GoogleIcon />
        </span>
    </button>
);

/* -------------------------------------------------------
   Account Switch
------------------------------------------------------- */

interface AccountSwitchProps {
    mode: AuthMode;
    onSwitch: (mode: AuthMode) => void;
}

const AccountSwitch = ({ mode, onSwitch }: AccountSwitchProps) => (
    <p className="mt-5 text-center text-[14px] leading-5 text-[#777]">
        {mode === 'signup' ? (
            <>
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={() => onSwitch('signin')}
                    className="
                        font-medium text-[#4f4f4f] underline underline-offset-[3px]
                        transition-colors duration-150 hover:text-black
                    "
                >
                    Sign in
                </button>
            </>
        ) : (
            <>
                Don&apos;t have an account?{' '}
                <button
                    type="button"
                    onClick={() => onSwitch('signup')}
                    className="
                        font-medium text-[#4f4f4f] underline underline-offset-[3px]
                        transition-colors duration-150 hover:text-black
                    "
                >
                    Sign up
                </button>
            </>
        )}
    </p>
);

/* -------------------------------------------------------
   Footer
------------------------------------------------------- */

const SignupFooter = () => (
    <p className="whitespace-nowrap text-[12px] leading-5 text-[#686868]">
        By clicking &quot;Sign up&quot; you agree our{' '}
        <a
            href="/privacy"
            className="underline underline-offset-[2px] transition-colors hover:text-black"
        >
            Privacy
        </a>{' '}
        &amp;{' '}
        <a
            href="/terms"
            className="underline underline-offset-[2px] transition-colors hover:text-black"
        >
            Terms
        </a>
    </p>
);

const SigninFooter = () => (
    <p className="whitespace-nowrap text-[13px] leading-5 text-[#686868]">
        Return to where your research belongs
    </p>
);

/* -------------------------------------------------------
   Brand Mark
------------------------------------------------------- */

const BrandMark = ({ className = '' }: { className?: string }) => (
    <div
        className={`
            relative flex shrink-0 items-center justify-center
            overflow-hidden rounded-full
            border border-white/80 bg-white
            shadow-[0_8px_24px_-10px_rgba(0,0,0,0.35)]
            ${className}
        `}
    >
        <img
            src={THE_ENTABLATURE_LIGHT_LOGO}
            alt="Entablature"
            draggable={false}
            className="h-full w-full object-contain"
        />
    </div>
);

/* -------------------------------------------------------
   Modal Header
------------------------------------------------------- */

const ModalHeader = ({ mode }: { mode: AuthMode }) => (
    <div className="flex flex-col items-center text-center">
        <div className="mb-5">
            <BrandMark className="h-[58px] w-[58px] sm:h-[64px] sm:w-[64px]" />
        </div>

        {mode === 'signup' ? (
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
                <h1 className="m-0 text-[26px] font-bold tracking-[-0.03em] text-[#111] sm:text-[30px]">
                    Become a part of
                </h1>
                <span className="font-literata text-[26px] italic tracking-[-0.03em] text-[#2864e8] sm:text-[30px]">
                    Entablature
                </span>
            </div>
        ) : (
            <h1 className="m-0 text-[26px] font-bold tracking-[-0.03em] text-[#111] sm:text-[30px]">
                Welcome back
            </h1>
        )}

        <div className="mt-3 h-px w-12 bg-gradient-to-r from-transparent via-[#d8b35c] to-transparent" />
    </div>
);

/* -------------------------------------------------------
   Illustration Panel
------------------------------------------------------- */

const IllustrationPanel = ({ mode }: { mode: AuthMode }) => (
    <div
        className="
            relative flex min-h-[280px] items-center justify-center overflow-hidden
            rounded-[28px] bg-[#f1f5ff]
            px-6 py-8
            md:min-h-[430px] md:px-8
        "
    >
        {/* Decorative background */}
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#dbe7ff] blur-2xl" />
        <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#fff0c8] blur-3xl" />
        <div className="absolute right-8 top-8 h-2 w-2 rounded-full bg-[#2864e8]" />
        <div className="absolute left-10 top-1/3 h-1.5 w-1.5 rounded-full bg-[#d7aa43]" />

        {/* Research cards */}
        <div className="absolute left-5 top-6 hidden gap-1.5 rounded-full border border-white/80 bg-white/80 px-3 py-1.5 text-[9px] font-medium tracking-[0.12em] text-[#69748a] shadow-sm backdrop-blur md:flex">
            RESEARCH
        </div>

        <div className="relative z-10 w-full max-w-[390px]">
            <div className="absolute -left-2 top-5 h-14 w-20 rotate-[-7deg] rounded-xl border border-white bg-white/75 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.4)] backdrop-blur sm:-left-4 sm:h-16 sm:w-24" />
            <div className="absolute -right-2 bottom-8 h-12 w-20 rotate-[7deg] rounded-xl border border-white bg-white/75 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.4)] backdrop-blur sm:-right-4 sm:h-14 sm:w-24" />

            <img
                src={illus.src}
                alt="Illustration"
                draggable={false}
                className="
                    relative z-10 mx-auto block h-auto w-full max-w-[360px]
                    object-contain drop-shadow-[0_18px_22px_rgba(31,51,92,0.12)]
                    pointer-events-none select-none
                "
                onError={(e) => {
                    e.currentTarget.style.display = 'none';
                }}
            />
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[10px] text-[#7c8799] sm:bottom-6 sm:left-7 sm:right-7">
            <span>Research belongs here.</span>
            <span className="hidden sm:inline">
                {mode === 'signup' ? 'Start contributing' : 'Continue researching'}
            </span>
        </div>
    </div>
);

/* -------------------------------------------------------
   Main Auth Content
------------------------------------------------------- */

interface MainContentProps {
    mode: AuthMode;
    onSwitch: (mode: AuthMode) => void;
    onGoogleAuth: () => void;
}

const MainContent = ({ mode, onSwitch, onGoogleAuth }: MainContentProps) => (
    <div className="flex w-full flex-col justify-center">
        <div className="mb-8">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2864e8]">
                {mode === 'signup' ? 'Join the community' : 'Your research space'}
            </p>

            <h2 className="m-0 font-literata text-[34px] font-normal italic leading-[1.08] tracking-[-0.045em] text-[#111] sm:text-[40px]">
                {mode === 'signup' ? 'Be a researcher' : 'Welcome back'}
            </h2>

            <div className="mt-4 h-px w-16 bg-[#d8b35c]" />
        </div>

        <GoogleButton mode={mode} onClick={onGoogleAuth} />

        <AccountSwitch mode={mode} onSwitch={onSwitch} />

        {/* Small visual reassurance block */}
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#ececec] bg-white/70 px-4 py-3.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef4ff]">
                <span className="h-2 w-2 rounded-full bg-[#2864e8]" />
            </div>
            <p className="m-0 text-[11px] leading-[17px] text-[#777]">
                {mode === 'signup'
                    ? 'One account. A place for your research to belong.'
                    : 'Sign in to return to your research space.'}
            </p>
        </div>
    </div>
);

/* -------------------------------------------------------
   Auth Modal
------------------------------------------------------- */

const AuthModal = ({ display, setDisplay, initialMode }: DisplayProps) => {
    const [mode, setMode] = useState<AuthMode>(initialMode ?? 'signup');

    const overlayRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    /* Sync mode whenever modal opens */
    useEffect(() => {
        if (display) {
            setMode(initialMode ?? 'signup');
        }
    }, [display, initialMode]);

    /* Lock body and Lenis scroll when modal is active */
    useEffect(() => {
        if (display) {
            try {
                stopLenis();
            } catch {
                // lenis might not be initialized
            }

            document.body.style.overflow = 'hidden';
        } else {
            try {
                startLenis();
            } catch {
                // lenis might not be initialized
            }

            document.body.style.overflow = '';
        }

        return () => {
            try {
                startLenis();
            } catch {
                // lenis cleanup
            }

            document.body.style.overflow = '';
        };
    }, [display]);

    /* Open animation */
    useEffect(() => {
        if (!overlayRef.current || !modalRef.current) {
            return;
        }

        if (display) {
            gsap.set(overlayRef.current, {
                display: 'flex',
            });

            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.25, ease: 'power2.out' },
            );

            gsap.fromTo(
                modalRef.current,
                { opacity: 0, scale: 0.97, y: 14 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.38,
                    ease: 'power3.out',
                },
            );
        }
    }, [display]);

    /* Switch signup / signin */
    const switchMode = (next: AuthMode) => {
        if (!contentRef.current || next === mode) {
            return;
        }

        gsap.to(contentRef.current, {
            opacity: 0,
            y: 5,
            duration: 0.13,
            ease: 'power2.in',
            onComplete: () => {
                setMode(next);

                gsap.fromTo(
                    contentRef.current,
                    { opacity: 0, y: -5 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.24,
                        ease: 'power2.out',
                    },
                );
            },
        });
    };

    /* Close */
    const handleClose = () => {
        if (!overlayRef.current || !modalRef.current) {
            return;
        }

        gsap.to(modalRef.current, {
            opacity: 0,
            scale: 0.97,
            y: 10,
            duration: 0.18,
            ease: 'power2.in',
        });

        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.18,
            ease: 'power2.in',
            onComplete: () => {
                if (!overlayRef.current) {
                    return;
                }

                gsap.set(overlayRef.current, {
                    display: 'none',
                });

                setDisplay();
            },
        });
    };

    /* Escape key */
    useEffect(() => {
        if (!display) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [display]);

    /* Google authentication */
    const handleGoogleAuth = () => {
        window.location.href = `${import.meta.env.PUBLIC_API_URL}/user/auth/google`;
    };

    if (!display) {
        return null;
    }

    return (
        <div
            ref={overlayRef}
            className="
                fixed inset-0 z-50 hidden items-center justify-center
                overflow-y-auto
                bg-[#111827]/70
                p-4 backdrop-blur-[5px]
                sm:p-6 md:p-8
            "
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    handleClose();
                }
            }}
        >
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-label={mode === 'signup' ? 'Sign up' : 'Sign in'}
                className="
                    relative my-auto flex w-full max-w-[980px] flex-col
                    overflow-hidden rounded-[28px]
                    border border-white/80
                    bg-[#f9fafc]
                    shadow-[0_35px_100px_-25px_rgba(0,0,0,0.55)]
                "
            >
                {/* Top accent */}
                <div className="absolute left-0 right-0 top-0 z-20 h-[3px] bg-gradient-to-r from-[#d9ad4d] via-[#2864e8] to-[#d9ad4d]" />

                {/* Close */}
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close"
                    className="
                        absolute right-4 top-4 z-30 flex h-10 w-10
                        items-center justify-center rounded-full
                        border border-black/5 bg-white/80 text-neutral-700
                        shadow-sm backdrop-blur
                        transition-all duration-200
                        hover:rotate-90 hover:bg-white hover:text-black
                        sm:right-5 sm:top-5
                    "
                >
                    <X size={19} strokeWidth={1.7} />
                </button>

                <div ref={contentRef} className="w-full">
                    {/* Header */}
                    <div className="px-6 pb-7 pt-10 sm:px-10 sm:pb-8 sm:pt-11">
                        <ModalHeader mode={mode} />
                    </div>

                    {/* Main content */}
                    <div className="grid grid-cols-1 gap-8 px-6 pb-6 sm:px-10 md:grid-cols-[minmax(0,0.86fr)_minmax(360px,1.14fr)] md:gap-10 md:px-12 md:pb-8">
                        <div className="flex items-center">
                            <MainContent
                                mode={mode}
                                onSwitch={switchMode}
                                onGoogleAuth={handleGoogleAuth}
                            />
                        </div>

                        <IllustrationPanel mode={mode} />
                    </div>

                    {/* Footer */}
                    <div className="border-t border-[#e9e9e9] bg-white/55 px-6 py-5 text-center sm:px-10">
                        {mode === 'signup' ? <SignupFooter /> : <SigninFooter />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
