'use client';
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

// Mini network for FinalCTA
const CTA_NODES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: (i * 83.7 + 5) % 100,
  y: (i * 51.3 + 15) % 100,
  vx: ((i % 5) - 2) * 0.018,
  vy: ((i % 7) - 3) * 0.014,
  size: i % 3 === 0 ? 3 : 2,
}));

function MiniNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef(CTA_NODES?.map(n => ({ ...n })));

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas?.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas?.offsetHeight * window.devicePixelRatio;
      ctx?.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas?.offsetWidth;
      const h = canvas?.offsetHeight;
      ctx?.clearRect(0, 0, w, h);
      const nodes = nodesRef?.current;

      nodes?.forEach(node => {
        node.x += node?.vx;
        node.y += node?.vy;
        if (node?.x < 0 || node?.x > 100) node.vx *= -1;
        if (node?.y < 0 || node?.y > 100) node.vy *= -1;
        node.x = Math.max(0, Math.min(100, node?.x));
        node.y = Math.max(0, Math.min(100, node?.y));
      });

      for (let i = 0; i < nodes?.length; i++) {
        for (let j = i + 1; j < nodes?.length; j++) {
          const dx = nodes?.[i]?.x - nodes?.[j]?.x;
          const dy = nodes?.[i]?.y - nodes?.[j]?.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 20) {
            const alpha = (1 - dist / 20) * 0.15;
            ctx?.beginPath();
            ctx?.moveTo((nodes?.[i]?.x / 100) * w, (nodes?.[i]?.y / 100) * h);
            ctx?.lineTo((nodes?.[j]?.x / 100) * w, (nodes?.[j]?.y / 100) * h);
            ctx.strokeStyle = `rgba(0, 113, 227, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx?.stroke();
          }
        }
      }

      nodes?.forEach(node => {
        ctx?.beginPath();
        ctx?.arc((node?.x / 100) * w, (node?.y / 100) * h, node?.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 113, 227, 0.2)';
        ctx?.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animRef?.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export default function FinalCTA() {
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
      { threshold: 0.2 }
    );
    if (ref?.current) observer?.observe(ref?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20"
      style={{ background: '#F5F5F7' }}
    >
      {/* Network animation */}
      <MiniNetwork />

      {/* Center glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,113,227,0.06) 0%, transparent 70%)',
        }}
      />

      {/* 3D floating elements */}
      <div
        className="absolute top-16 left-[10%] w-32 h-32 rounded-full pointer-events-none z-0 animate-float-slow"
        style={{
          background: 'radial-gradient(circle, rgba(0,113,227,0.1) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
      <div
        className="absolute bottom-16 right-[10%] w-48 h-48 rounded-full pointer-events-none z-0 animate-float-slow"
        style={{
          animationDelay: '4s',
          background: 'radial-gradient(circle, rgba(52,170,220,0.08) 0%, transparent 70%)',
          filter: 'blur(12px)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(60px)',
            transition: 'all 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Begin Your Journey
          </span>
          <h2 className="font-display text-hero gradient-text mb-6">
            Your Business
            <br />
            <span className="italic font-light gradient-text-blue">Begins Here.</span>
          </h2>
          <p
            className="text-xl text-muted-foreground font-light leading-relaxed mb-12 max-w-2xl mx-auto"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            Join 12,000+ founders who chose precision over compromise.
            Register your company today and build something that lasts.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s',
            }}
          >
            <Link href="/services" className="btn-register text-lg px-10 py-5 btn-primary-glow">
              Register Your Company
              <Icon name="ArrowRightIcon" size={20} />
            </Link>
            <Link href="/dashboard" className="btn-ghost text-base px-8 py-4">
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}