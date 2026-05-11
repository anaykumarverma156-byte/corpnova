'use client';
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function ServicesCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref?.current) observer?.observe(ref?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section className="relative py-16 overflow-hidden border-t border-border/30">
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob-primary absolute w-[600px] h-[400px] left-1/2 -translate-x-1/2 top-0 opacity-40" />
      </div>
      <div
        ref={ref}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h2 className="font-display text-section-title gradient-text mb-4">
          Not sure where to start?
        </h2>
        <p className="text-lg text-muted-foreground font-light mb-8 leading-relaxed">
          Our expert advisors will guide you to the right structure for your business goals.
          Free 30-minute consultation included.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/dashboard" className="btn-register px-8 py-4">
            Schedule Free Consultation
            <Icon name="ArrowRightIcon" size={18} />
          </Link>
          <Link href="/" className="btn-ghost px-6 py-4 text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}