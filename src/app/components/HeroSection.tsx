'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

// Connected network animation nodes
const NODES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: (i * 73.7 + 11) % 100,
  y: (i * 47.3 + 7) % 100,
  vx: ((i % 7) - 3) * 0.015,
  vy: ((i % 5) - 2) * 0.012,
  size: i % 4 === 0 ? 3.5 : i % 3 === 0 ? 2.5 : 1.8,
}));

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef(NODES.map(n => ({ ...n })));
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;

      // Update positions
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > 100) node.vx *= -1;
        if (node.y < 0 || node.y > 100) node.vy *= -1;
        node.x = Math.max(0, Math.min(100, node.x));
        node.y = Math.max(0, Math.min(100, node.y));
      });

      // Draw connections
      const maxDist = 18;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo((nodes[i].x / 100) * w, (nodes[i].y / 100) * h);
            ctx.lineTo((nodes[j].x / 100) * w, (nodes[j].y / 100) * h);
            ctx.strokeStyle = `rgba(0, 113, 227, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Mouse proximity connections
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      nodes.forEach(node => {
        const dx = node.x - mx;
        const dy = node.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 20) {
          const alpha = (1 - dist / 20) * 0.35;
          ctx.beginPath();
          ctx.moveTo((node.x / 100) * w, (node.y / 100) * h);
          ctx.lineTo((mx / 100) * w, (my / 100) * h);
          ctx.strokeStyle = `rgba(0, 113, 227, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        const nx = (node.x / 100) * w;
        const ny = (node.y / 100) * h;
        const dx = node.x - mx;
        const dy = node.y - my;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - distToMouse / 20);

        ctx.beginPath();
        ctx.arc(nx, ny, node.size + proximity * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 113, 227, ${0.25 + proximity * 0.5})`;
        ctx.fill();

        if (proximity > 0.3) {
          ctx.beginPath();
          ctx.arc(nx, ny, node.size + proximity * 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 113, 227, ${proximity * 0.08})`;
          ctx.fill();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.9 }}
    />
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white pt-24 pb-16"
    >
      {/* Network animation canvas */}
      <NetworkCanvas />

      {/* Subtle radial gradient center glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,113,227,0.05) 0%, transparent 70%)',
        }}
      />

      {/* 3D floating orb — top right */}
      <div
        className="absolute top-24 right-[8%] w-64 h-64 pointer-events-none z-0 animate-float-slow"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(0,113,227,0.12) 0%, rgba(52,170,220,0.06) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(2px)',
          transform: 'perspective(600px) rotateX(15deg) rotateY(-20deg)',
        }}
      />

      {/* 3D floating orb — bottom left */}
      <div
        className="absolute bottom-32 left-[6%] w-48 h-48 pointer-events-none z-0 animate-float-slow"
        style={{
          animationDelay: '3s',
          background: 'radial-gradient(circle at 40% 40%, rgba(0,119,237,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(1px)',
          transform: 'perspective(600px) rotateX(-10deg) rotateY(15deg)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            India&apos;s Premier Business Formation Platform
          </span>
        </div>

        {/* Main Heading */}
        <h1
          className="font-display text-hero gradient-text mb-6"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.96)',
            transition: 'all 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Start Something
          <br />
          <span className="italic font-light gradient-text-blue">That Lasts.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-12"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s',
          }}
        >
          From idea to incorporation — register your Pvt Ltd, LLP, or OPC with us.
          Built for founders who demand precision, speed, and trust.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
          }}
        >
          <Link href="#get-quote" className="btn-register text-base px-8 py-4 btn-primary-glow">
            Register
            <Icon name="ArrowRightIcon" size={18} />
          </Link>
          <Link href="/services" className="btn-ghost text-base px-8 py-4">
            Explore Services
          </Link>
        </div>

        {/* 3D Dashboard Mockup Preview */}
        <div
          className="relative mx-auto max-w-5xl"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed
              ? 'translateY(0) perspective(1200px) rotateX(2deg)'
              : 'translateY(80px) perspective(1200px) rotateX(10deg)',
            transition: 'all 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
          }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-accent/8 to-primary/10 rounded-2xl blur-xl opacity-60" />
          <div
            className="relative rounded-2xl overflow-hidden animate-float-3d"
            style={{
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,1) inset',
            }}
          >
            {/* Window chrome */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: 'rgba(0,0,0,0.06)', background: 'rgba(248,248,250,0.9)' }}
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div
                className="flex items-center gap-2 px-3 py-1 rounded text-xs text-muted-foreground"
                style={{ background: 'rgba(0,0,0,0.04)' }}
              >
                <Icon name="LockClosedIcon" size={10} variant="solid" />
                registerstartup.in/dashboard
              </div>
              <div className="w-16" />
            </div>

            {/* Dashboard preview — clean white UI mockup */}
            <div className="p-6 bg-white">
              <div className="flex gap-4 mb-4">
                {['1200+\nBusinesses', '99.8%\nSuccess', '48hrs\nAvg Time', '50+\nServices'].map((stat, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-xl p-4 text-center"
                    style={{
                      background: i === 0 ? 'rgba(0,113,227,0.06)' : 'rgba(0,0,0,0.02)',
                      border: '1px solid rgba(0,0,0,0.05)',
                    }}
                  >
                    {stat.split('\n').map((line, j) => (
                      <div
                        key={j}
                        className={j === 0 ? 'font-display font-bold text-lg text-foreground' : 'text-xs text-muted-foreground mt-0.5'}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <div
                  className="flex-1 h-24 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, rgba(0,113,227,0.08) 0%, rgba(52,170,220,0.05) 100%)', border: '1px solid rgba(0,113,227,0.1)' }}
                />
                <div
                  className="w-1/3 h-24 rounded-xl"
                  style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{
          opacity: revealed ? 0.5 : 0,
          transition: 'opacity 1s ease 1.5s',
        }}
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
      </div>
    </section>
  );
}
