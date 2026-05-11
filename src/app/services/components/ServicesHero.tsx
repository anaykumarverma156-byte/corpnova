'use client';
import React, { useEffect, useState } from 'react';

export default function ServicesHero() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden pt-28 pb-16 bg-white"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(0,113,227,0.06) 0%, transparent 70%)',
        }}
      />

      {/* 3D floating orbs */}
      <div
        className="absolute top-20 right-[12%] w-40 h-40 rounded-full pointer-events-none animate-float-slow"
        style={{
          background: 'radial-gradient(circle, rgba(0,113,227,0.1) 0%, transparent 70%)',
          filter: 'blur(4px)',
          transform: 'perspective(600px) rotateX(15deg) rotateY(-20deg)',
        }}
      />
      <div
        className="absolute bottom-10 left-[8%] w-32 h-32 rounded-full pointer-events-none animate-float-slow"
        style={{
          animationDelay: '2.5s',
          background: 'radial-gradient(circle, rgba(52,170,220,0.08) 0%, transparent 70%)',
          filter: 'blur(3px)',
        }}
      />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.4 }}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots-svc" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(0,113,227,0.15)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-svc)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <span
          className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4"
          style={{
            opacity: revealed ? 1 : 0,
            transition: 'opacity 0.8s ease 0.1s',
          }}
        >
          Complete Service Catalog
        </span>
        <h1
          className="font-display text-section-title gradient-text mb-5"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          Every Service Your
          <br />
          <span className="italic font-light gradient-text-blue">Company Needs.</span>
        </h1>
        <p
          className="max-w-2xl mx-auto text-lg text-muted-foreground font-light leading-relaxed"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s',
          }}
        >
          From business formation to ongoing compliance — 20+ expert-managed services
          for India&apos;s next generation of founders.
        </p>
      </div>
    </section>
  );
}