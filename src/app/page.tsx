"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Script from "next/script";

function useScrollReveal() {
  const refs = useRef<(HTMLElement | null)[]>([]);

  const setRef = useCallback((index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return setRef;
}

/* ─── Icons as SVG components ─── */
function MetaAdsIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 mx-auto mb-5">
      <rect x="4" y="4" width="40" height="40" rx="8" className="stroke-navy-700" strokeWidth="2.5" />
      <circle cx="18" cy="20" r="5" className="stroke-navy-700" strokeWidth="2" />
      <circle cx="30" cy="20" r="5" className="stroke-navy-700" strokeWidth="2" />
      <path d="M14 34c2-4 6-6 10-6s8 2 10 6" className="stroke-silver-400" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 28v-4" className="stroke-navy-700" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function AutomationIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 mx-auto mb-5">
      <rect x="6" y="10" width="36" height="28" rx="4" className="stroke-navy-700" strokeWidth="2.5" />
      <path d="M14 22h8M14 28h12" className="stroke-silver-400" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 20l4 4-4 4" className="stroke-navy-700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="34" cy="14" r="3" className="fill-navy-700" />
      <path d="M34 11V6" className="stroke-navy-700" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CreativeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 mx-auto mb-5">
      <rect x="6" y="6" width="36" height="36" rx="4" className="stroke-navy-700" strokeWidth="2.5" />
      <circle cx="18" cy="18" r="4" className="stroke-silver-400" strokeWidth="2" />
      <path d="M6 32l10-8 6 4 10-10 10 8" className="stroke-navy-700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 10l4 4-4 4" className="stroke-navy-700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LandingPageIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 mx-auto mb-5">
      <rect x="8" y="6" width="32" height="36" rx="4" className="stroke-navy-700" strokeWidth="2.5" />
      <path d="M8 14h32" className="stroke-silver-400" strokeWidth="2" />
      <circle cx="13" cy="10" r="1.5" className="fill-silver-400" />
      <circle cx="18" cy="10" r="1.5" className="fill-silver-400" />
      <circle cx="23" cy="10" r="1.5" className="fill-silver-400" />
      <rect x="14" y="20" width="20" height="4" rx="2" className="fill-navy-700" />
      <path d="M18 30h12" className="stroke-silver-400" strokeWidth="2" strokeLinecap="round" />
      <rect x="20" y="34" width="8" height="3" rx="1.5" className="stroke-navy-700" strokeWidth="1.5" />
    </svg>
  );
}

function AuditIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
      <circle cx="22" cy="22" r="12" className="stroke-navy-700" strokeWidth="2.5" />
      <path d="M31 31l10 10" className="stroke-silver-400" strokeWidth="3" strokeLinecap="round" />
      <path d="M17 22h10M22 17v10" className="stroke-navy-700" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LaunchIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
      <path d="M24 6l6 12h12l-10 8 4 14-12-8-12 8 4-14L6 18h12z" className="stroke-navy-700 fill-none" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="4" className="fill-silver-400" />
    </svg>
  );
}

function ResultsIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
      <rect x="6" y="6" width="36" height="36" rx="4" className="stroke-navy-700" strokeWidth="2.5" />
      <path d="M14 32l6-10 6 6 8-14" className="stroke-silver-400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="32" r="2" className="fill-navy-700" />
      <circle cx="20" cy="22" r="2" className="fill-navy-700" />
      <circle cx="26" cy="28" r="2" className="fill-navy-700" />
      <circle cx="34" cy="14" r="2" className="fill-navy-700" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 animate-bounce mt-2">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const setRef = useScrollReveal();

  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10 || currentScrollY < lastScrollY.current) {
        setHeaderVisible(true);
      } else {
        setHeaderVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* ─── NAV ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-silver-200 transition-transform duration-300 ease-in-out ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center">
          {/* Left spacer to help centering - hidden on mobile if needed, but here we use a grid-like flex approach */}
          <div className="flex-1" />

          {/* Centered Logo Unit */}
          <div className="flex flex-col items-center justify-center text-center gap-1 mx-auto">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 568.25 568.25" className="w-20 h-20" style={{ filter: 'drop-shadow(0 0 10px rgba(176, 190, 197, 0.9))' }}>
              <path fill="#05337D" d="M191.83,308.64c48.15.91,96.31,1.81,144.46,2.72v5.83h-147.21c.92-2.85,1.83-5.7,2.75-8.55Z" />
              <path fill="#05337D" d="M345.84,325.84c-3.94-3.07-7.22-5.49-9.27-6.97l-7.93-5.95c-2.04-1.1-11.07-5.99-13.33-7.21-10.09-5.46-11.71-6.34-14.88-7.86-7.54-3.62-12.7-5.55-15.86-6.64-2.28-.79-4.22-1.4-5.62-1.82,4.61-2.79,10.22-6.36,16.46-10.74,2.08-1.46,10.35-7.39,19.84-15.26,18.31-15.19,31.68-30.02,40.97-41.58,13.18-16.42,19.77-24.62,24.15-37.3,6.56-18.97,5.1-35.87,4.28-44.33-.64-6.66-1.66-16.34-6.73-27.82-.86-1.94-4.23-9.37-11.01-18.04-3.16-4.04-14.16-17.44-33.63-27.52-7.55-3.91-25.64-12.99-50.02-11.92-17.96.79-30.67,6.71-42.85,12.38-10.45,4.87-27.39,12.87-43.34,30.27-12.54,13.68-18.74,26.91-22.15,34.33-5.39,11.73-6.87,19.37-7.34,22.03-1.27,7.29-1.3,13.69-1.31,17.66,0,2.73-.01,8.33.84,14.94.56,4.36,1.6,10.03,1.83,11.27.24,1.3.36,1.95.54,2.85.73,3.6,1.52,7.5,3.14,12.04,1.33,3.71,2.68,6.34,4.66,10.2.77,1.49,1.53,2.9,2.53,4.51,1.49,2.4,2.76,4.03,3.03,4.37,1.71,2.2,2.66,2.96,3.84,4.3,3.63,4.1,3.03,6.24,6.27,10.67.82,1.12,1.61,2.02,5.54,5.61,4.77,4.36,7.64,6.99,13.21,11.46,6.13,4.93,9.7,7.81,15.12,11.41,3.42,2.27,8.37,5.54,15.37,8.93,5.52,2.67,10.4,4.51,14.14,5.75-2.46.92-5.98,2.35-10.08,4.39-3.91,1.95-6.65,3.69-9.27,5.2-6.42,3.71-12.53,7.46-18.34,11.21,0,0-4.59,3.29-10.09,8.35-53.81,49.49-61.86,111.9-61.45,122.6.27,7.2,1.25,14.5,1.25,14.5.7,5.24,1.5,9.18,1.76,10.41,3.89,18.73,11.09,32.35,14.42,37.4,1.29,1.95,2.75,3.97,2.75,3.97.73,1.01,3.02,4.14,6.04,7.65,4.56,5.3,8.49,8.79,14.6,14.21,2.53,2.25,4.93,4.28,8.26,6.5,1.91,1.27,3.42,2.13,4.12,2.52,4.21,2.37,15.3,8.39,19.35,10.63,8.04,4.47,6.36,4.1,12.22,7.17,13.52,7.07,16.92,6.1,18.34,5.46,1.66-.74,3.55-2.34,6.83-2.43,1.65-.05,3.01.29,3.92.6,10.9,1.53,24.44,2.47,39.87,1.33,22-1.62,39.81-6.83,52.02-11.38,0,0,0,0,0,0,.13-.06,36.24-16.29,55.95-55.34,2.91-5.77,10.1-20.33,11.92-39.13h0c.2,0,1.31-23.65,0-35.99-4.12-38.71-43.08-69.07-74.89-93.87ZM188.88,226.72c-12.42-19.24-14.98-37.94-15.43-41.57-.19-1.58-.3-2.74-.36-3.39-.59-5.96-2.13-26.83,7.95-50.75,1.96-4.65,10.56-24.15,30.88-41.27,10.19-8.59,19.29-13.18,24.76-15.9,12.07-5.99,38.34-19.03,68.18-12.54,9.85,2.14,17.25,5.8,20.18,7.34,13.29,6.99,21.22,15.98,25.38,20.79,6.71,7.77,10.7,14.82,12.54,18.34,1.55,2.97,4.08,7.89,6.11,14.68,3.38,11.27,3.22,20.51,3.06,26.9-.12,4.86-.42,14.26-3.97,25.68-2.38,7.66-5.57,14.15-10.39,22.01-14.59,23.78-31.67,39.81-46.78,53.81-6.67,6.18-12.34,10.82-16.75,14.22-.68.53-2.95,2.27-6.79,5.04-5.33,3.85-12.89,9.12-22.53,15.21-3.88-1.16-9.04-2.94-14.89-5.67-4.57-2.13-7.72-3.99-11.37-6.14-14.1-8.34-23.07-16.04-25.57-18.23-3.46-3.03-5.71-5.3-6.99-6.65-1.71-1.78-3.87-4.18-7.44-8.68-3.25-4.1-6.59-8.32-9.76-13.23ZM413.39,470.06c-.42,1.92-1.63,7.06-5.04,14.98-1.97,4.58-6.14,14.08-14.22,24.76-11.61,15.35-24.43,24.06-29.96,27.52-15.32,9.58-28.94,12.86-39.44,15.29-15.95,3.69-28.45,3.88-38.37,3.97-22.15.21-38.22-3.19-42.5-4.13-7.64-1.67-12.43-2.72-17.54-4.77-.82-.33-2.34-.96-5.04-2.32-9.31-4.67-18.76-9.42-29.08-17.98-4.62-3.83-15.55-13.05-24.31-27.97-1.01-1.72-3.9-6.77-6.73-13.76-1.93-4.78-4.29-10.7-5.5-18.65,0,0-.84-5.5-.76-11.62.09-6.99,12.52-58.13,41.12-107.01.89-1.51,5.46-9.23,12.86-17.31,2.94-3.21,8.63-7.93,9-8.26,3.36-2.95,2.48-2.02,8.04-6.8,1.36-1.17,2.82-2.43,4.97-3.97,1.56-1.12,2.86-1.95,3.9-2.59,13.56-8.34,24.53-12.7,24.53-12.7,1.67-.67,4.11-1.59,7.11-2.6,5.42,1.65,9.83,3.3,13.03,4.59,3.84,1.54,7.08,3.01,12.27,5.39,2.96,1.36,2.36,1.1,7.91,3.67,6.61,3.05,7.18,3.28,9.63,4.47,4.48,2.18,7.63,3.89,8.48,4.36,3.64,1.99,6.32,3.6,6.99,4.01,5.64,3.42,8.53,5.2,11.54,8.14,1.95,1.9,3.32,3.66,4.16,4.82,14.4,19.82,74.47,65.62,74.62,120.42,0,3.46-.21,9.07-1.68,16.05Z" />
              <path fill="#05337D" d="M372.09,449.89c.31,0,.61,0,.93,0-.32,0-.62,0-.93,0,0,0,0,0,0,0Z" />
              <path fill="#05337D" d="M319.05,72.11c-1.25-4.03-4.18-11.42-11.11-17.46-13.88-12.09-32.26-8.72-36.51-7.94-19.44,3.57-30.68,17.95-36.51,25.4-8.57,10.96-15.54,34.09-14.29,28.57-31.75,116.4-63.49,232.8-95.24,349.21,7.86-.27,35.22-.39,69.38-.43-.29-38.01-.22-72.83.04-103.95.55-64.65,1.66-81.23,2.75-94.01,4.56-53.37,12.77-87.37,18.34-107.31,3.57-12.76,7.04-23.28,9.63-30.73.88-2.38,6.71-17.6,19.26-20.64,1.63-.39,4.74-1.11,8.25,0,6.91,2.18,10.14,9.74,11.46,12.84,11.91,27.92,57.22,180.63,64.66,204.54,1.17,3.74,4.8,15.23,10.09,32.56,7.89,25.84,11.01,37.22,16.51,55.49,3.75,12.44,9.19,30.07,16.27,51.52,14.15.07,16.94.12.97.12,28.39.16,52.3.1,69.84,0-41.27-125.93-82.54-251.85-123.81-377.78Z" />
              <path fill="#05337D" d="M284.13,0C127.21,0,0,127.21,0,284.13s127.21,284.13,284.13,284.13,284.13-127.21,284.13-284.13S441.05,0,284.13,0ZM284.13,558.44c-151.5,0-274.31-122.81-274.31-274.31S132.63,9.81,284.13,9.81s274.31,122.81,274.31,274.31-122.81,274.31-274.31,274.31Z" />
            </svg>
            <span className="font-heading text-2xl font-bold tracking-tight text-navy-700">
              Alanté.
            </span>
          </div>

          {/* "Book a Call" button pushed to the right */}
          <div className="flex-1 flex justify-end">
            <a
              href="#book"
              className="bg-[#05337D] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#042a6a] transition-colors duration-200"
            >
              Book a Call
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center bg-white pt-40">
        {/* Geometric accent shapes */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-silver-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-navy-700/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-base font-semibold text-navy-700 tracking-wide mb-4">
            Serving Dental Practices Across New Jersey
          </p>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-800 leading-[1.08] text-navy-700 mb-6 tracking-tight">
            We Get Dental Practices
            <br />
            More <span style={{ color: '#2563EB' }}>Invisalign</span> Patients.
            <br />
            <span style={{ color: '#2563EB' }}>
              Guaranteed.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-silver-500 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            From filming your ad to booking the consultation — we handle everything. 3 new patients in 30 days{" "}
            <span className="text-navy-700 font-semibold">or you don&apos;t pay.</span>
          </p>

          <a
            href="#book"
            className="inline-flex items-center gap-2 bg-[#05337D] text-white text-base font-bold px-8 py-4 rounded-xl hover:bg-[#042a6a] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#05337D]/20"
          >
            Book a Free Strategy Call
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="text-base text-navy-700 mt-4 font-medium">
            We only work with one dental practice per town. Once your area is taken, it&apos;s closed.
          </p>

          <div className="mt-16 flex justify-center text-silver-400">
            <ChevronDown />
          </div>
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section className="py-24 sm:py-32 bg-silver-100">
        <div
          ref={setRef(0)}
          className="max-w-4xl mx-auto px-6 opacity-0 [&.revealed]:animate-fade-up"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-silver-500 mb-4">
            The Problem
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy-700 leading-tight mb-6">
            Most dental ads don&apos;t work.
            <br className="hidden sm:block" /> Here&apos;s why.
          </h2>
        </div>

        <div className="max-w-4xl mx-auto px-6 mt-14 grid sm:grid-cols-3 gap-6">
          {[
            {
              num: "01",
              title: "Generic creative",
              desc: "Stock photos and recycled graphics don't stop the scroll. Patients scroll past ads that look like every other dental practice in your area.",
            },
            {
              num: "02",
              title: "Wrong targeting",
              desc: "Broad audiences waste your budget on people who will never sit in your chair. Your ads need to reach the right people in your zip code.",
            },
            {
              num: "03",
              title: "Leads go cold",
              desc: "A patient inquires, then contacts three other practices. Whoever responds first wins. Most practices respond hours later — or never.",
            },
          ].map((item, i) => (
            <div
              key={item.num}
              ref={setRef(i + 1)}
              className="bg-white rounded-2xl p-6 border border-silver-200 opacity-0 [&.revealed]:animate-fade-up"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <span className="text-3xl font-heading font-bold text-silver-300">{item.num}</span>
              <h3 className="font-heading text-lg font-bold text-navy-700 mt-3 mb-2">{item.title}</h3>
              <p className="text-silver-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHAT WE DO ─── */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div
            ref={setRef(4)}
            className="text-center mb-16 opacity-0 [&.revealed]:animate-fade-up"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-silver-500 mb-4">
              What We Do
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy-700 leading-tight mb-4">
              We handle the entire patient acquisition system.
              <br className="hidden sm:block" /> You just see new patients.
            </h2>
            <p className="text-lg text-silver-500 leading-relaxed">
              Four components. Fully done for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <CreativeIcon />,
                title: "Creative Production",
                desc: "We come to your practice in Edison, Metuchen, or anywhere in Central NJ, film your ad, write the script, and produce everything — video and static. Content that actually looks like it belongs in someone's feed.",
              },
              {
                icon: <MetaAdsIcon />,
                title: "Targeted Meta Ads",
                desc: "Hyper-local campaigns on Facebook and Instagram targeting Invisalign-ready patients in your zip code. No wasted spend. No guessing.",
              },
              {
                icon: <LandingPageIcon />,
                title: "Dedicated Landing Page",
                desc: "Every click goes to a page built for one thing — getting that person to request a consultation. No distractions, no homepage, no drop-off.",
              },
              {
                icon: <AutomationIcon />,
                title: "Instant Follow-Up",
                desc: "The moment someone inquires, they get an automated response. We qualify the lead and forward a warm, ready-to-book patient directly to your team.",
              },
            ].map((card, i) => (
              <div
                key={card.title}
                ref={setRef(i + 5)}
                className="group text-center bg-silver-100 rounded-2xl p-8 border border-silver-200 hover:border-navy-700/20 hover:shadow-xl hover:shadow-navy-700/5 transition-all duration-300 opacity-0 [&.revealed]:animate-fade-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-navy-700 mb-3">{card.title}</h3>
                <p className="text-silver-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 sm:py-32 bg-silver-100">
        <div className="max-w-5xl mx-auto px-6">
          <div
            ref={setRef(9)}
            className="text-center mb-16 opacity-0 [&.revealed]:animate-fade-up"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-silver-500 mb-4">
              How It Works
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy-700 leading-tight">
              Four steps. New patients in 30 days.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                step: "01",
                icon: <AuditIcon />,
                title: "We audit your market",
                desc: "We analyze your competition, identify the gap, and map out exactly what your campaign needs to win in your area.",
              },
              {
                step: "02",
                icon: <LaunchIcon />,
                title: "We film and launch",
                desc: "One shoot at your practice. We show up, handle script, filming, editing, and ad setup. You approve it, we launch it.",
              },
              {
                step: "03",
                icon: <AutomationIcon />,
                title: "Leads come in automatically",
                desc: "Your campaign runs 24/7. Every inquiry gets an instant follow-up — no lead goes cold waiting for a callback.",
              },
              {
                step: "04",
                icon: <ResultsIcon />,
                title: "You get booked consultations",
                desc: "Not raw leads. Not form fills. Warm, qualified patients handed to your front desk ready to schedule.",
              },
            ].map((step, i) => (
              <div
                key={step.step}
                ref={setRef(i + 10)}
                className="relative opacity-0 [&.revealed]:animate-fade-up"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                {/* Connector line */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-0.5 bg-gradient-to-r from-silver-300 to-transparent" />
                )}

                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white border-2 border-silver-200 flex items-center justify-center mb-6 shadow-sm">
                    {step.icon}
                  </div>
                  <span className="inline-block bg-navy-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-wider">
                    STEP {step.step}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-navy-700 mb-2">{step.title}</h3>
                  <p className="text-silver-500 text-sm leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE GUARANTEE ─── */}
      <section className="relative py-24 sm:py-32 bg-navy-700 overflow-hidden">
        {/* Geometric accent */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white/5 blur-2xl" />

        <div
          ref={setRef(14)}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center opacity-0 [&.revealed]:animate-scale-in"
        >
          <div className="inline-block bg-white/10 rounded-full px-4 py-1.5 mb-8">
            <span className="text-sm font-bold text-white/80 tracking-widest uppercase">
              Our Guarantee
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-800 text-white leading-tight mb-8">
            3 new Invisalign consultations
            <br className="hidden sm:block" /> in 30 days. Or you pay nothing.
          </h2>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-4 leading-relaxed">
            No long-term contracts. No setup fees. No risk. We put our money where our mouth is because we know our system works.
          </p>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-6 leading-relaxed">
            We also work exclusively with one practice per town — so your competitor can&apos;t buy the same system.
          </p>
          <p className="text-base text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            We&apos;re based in Central  Jersey. We work with a select number of local practices at a time — which means you get direct access to us, not a ticket system.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#book"
              className="inline-flex items-center gap-2 bg-white text-navy-700 text-base font-bold px-8 py-4 rounded-xl hover:bg-silver-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Claim Your Guarantee
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="py-20 bg-white border-b border-silver-200">
        <div
          ref={setRef(15)}
          className="max-w-5xl mx-auto px-6 opacity-0 [&.revealed]:animate-fade-up"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { value: "$5,500", label: "Average Invisalign Case Value" },
              { value: "$16,500+", label: "Revenue from 3 Consultations" },
              { value: "68%", label: "Of Leads That Never Get Called Back" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-3xl sm:text-4xl font-800 text-navy-700">{stat.value}</p>
                <p className="text-silver-500 text-sm mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA / BOOK ─── */}
      <section id="book" className="py-24 sm:py-32 bg-silver-100">
        <div
          ref={setRef(16)}
          className="max-w-3xl mx-auto px-6 text-center opacity-0 [&.revealed]:animate-fade-up"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-silver-500 mb-4">
            Let&apos;s Talk
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-navy-700 leading-tight mb-4">
            Ready to fill your schedule?
          </h2>
          <p className="text-lg text-silver-500 max-w-xl mx-auto mb-12 leading-relaxed">
            Book a free strategy call. We will audit your current setup, show you exactly where patients are slipping through, and map out a 30-day plan built specifically for your practice and your market in New Jersey.
          </p>

          {/* Calendly Inline Widget */}
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/alantemediaconsulting/free-strategy-call?primary_color=05337d"
            style={{ minWidth: '320px', height: '700px' }}
          />
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="lazyOnload"
          />
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-10 bg-navy-700 border-t border-navy-600">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading text-xl font-bold tracking-tight text-white">
            Alanté<span className="text-silver-400">.</span>
          </span>
          <a
            href="mailto:hello@alantemedia.com"
            className="text-white/60 hover:text-white text-sm transition-colors duration-200"
          >
            hello@alantemedia.com
          </a>
        </div>
      </footer>
    </main>
  );
}
