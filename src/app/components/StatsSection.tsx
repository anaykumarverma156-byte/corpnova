'use client';
import React, { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 1200, suffix: '+', label: 'Businesses Registered', prefix: '' },
  { value: 99.8, suffix: '%', label: 'Success Rate', prefix: '' },
  { value: 48, suffix: 'hrs', label: 'Average Response Time', prefix: '' },
  { value: 50, suffix: '+', label: 'Services Offered', prefix: '' },
];

function useCountUp(target: number, active: boolean, decimals = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parseFloat((eased * target).toFixed(decimals));
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, decimals]);
  return count;
}

function StatItem({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const isDecimal = stat.value % 1 !== 0;
  const count = useCountUp(stat.value, active, isDecimal ? 1 : 0);
  return (
    <div className="text-center px-6 py-10 border-r border-black/6 last:border-r-0">
      <div className="stat-number gradient-text-blue font-display mb-2">
        {stat.prefix}{isDecimal ? count.toFixed(1) : Math.floor(count)}{stat.suffix}
      </div>
      <p className="text-sm text-muted-foreground font-medium tracking-wide">{stat.label}</p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-4 bg-white" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
      <div
        ref={ref}
        className="relative z-10 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x-0 md:divide-x"
        style={{ '--tw-divide-opacity': '1', borderColor: 'rgba(0,0,0,0.06)' } as React.CSSProperties}
      >
        {STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} active={active} />
        ))}
      </div>
    </section>
  );
}