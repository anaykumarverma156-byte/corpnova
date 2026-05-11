'use client';
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const FEATURES = [
  { icon: 'ChatBubbleLeftRightIcon', label: 'Expert Guidance' },
  { icon: 'DocumentCheckIcon', label: 'Document Review' },
  { icon: 'ClockIcon', label: 'Priority Support' },
  { icon: 'ShieldCheckIcon', label: 'Secure Handling' },
];

export default function DashboardReveal() {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white">
      {/* Subtle top gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,113,227,0.04) 0%, transparent 70%)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Personalized Guidance
          </span>
          <h2 className="text-3xl md:text-5xl font-display gradient-text mb-5">
            One Consultation.
            <br />
            <span className="italic font-light gradient-text-blue">Complete Control.</span>
          </h2>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg font-light leading-relaxed">
            Get expert advice on your registration process, document management, and compliance — all in one session.
          </p>
        </div>

        {/* 3D Mockup - Rebranded as Consultation Portal */}
        <div
          className="relative"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? 'translateY(0) perspective(1400px) rotateX(2deg)'
              : 'translateY(60px) perspective(1400px) rotateX(8deg)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          <div
            className="absolute -inset-2 rounded-3xl"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(0,113,227,0.08) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.07)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.05)',
            }}
          >
            {/* Window chrome */}
            <div
              className="flex items-center justify-between px-5 py-3.5"
              style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', background: 'rgba(248,248,250,0.95)' }}
            >
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-md text-xs text-muted-foreground"
                style={{ background: 'rgba(0,0,0,0.04)' }}
              >
                <Icon name="LockClosedIcon" size={10} variant="solid" />
                portal.registerstartup.in
              </div>
              <div className="w-20" />
            </div>

            {/* Content mockup */}
            <div className="p-6 bg-white">
              <div className="flex gap-4 mb-5">
                {[
                  { label: 'Consultations Done', val: '1,200+', color: 'rgba(0,113,227,0.07)' },
                  { label: 'Expert Score', val: '4.9/5', color: 'rgba(52,170,220,0.06)' },
                  { label: 'Success Rate', val: '99.8%', color: 'rgba(52,199,89,0.07)' },
                  { label: 'Upcoming Calls', val: '12', color: 'rgba(255,149,0,0.07)' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-xl p-4"
                    style={{ background: item.color, border: '1px solid rgba(0,0,0,0.05)' }}
                  >
                    <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                    <div className="font-display font-bold text-xl text-foreground">{item.val}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <div
                  className="flex-1 rounded-xl p-4 h-32 flex items-end gap-2"
                  style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)' }}
                >
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${h}%`,
                        background: i === 9
                          ? 'linear-gradient(180deg, #0071E3 0%, #34AADC 100%)'
                          : 'rgba(0,113,227,0.15)',
                      }}
                    />
                  ))}
                </div>

                <div
                  className="w-56 rounded-xl p-4"
                  style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)' }}
                >
                  {[
                    { name: 'Pvt Ltd Help', status: 'Ready' },
                    { name: 'GST Query', status: 'Solved' },
                    { name: 'IP Audit', status: 'Ongoing' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                      <span className="text-xs text-foreground font-medium">{item.name}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: item.status === 'Ready' ? 'rgba(52,199,89,0.12)' : item.status === 'Solved' ? 'rgba(0,113,227,0.1)' : 'rgba(255,149,0,0.12)',
                          color: item.status === 'Ready' ? '#1A8C3A' : item.status === 'Solved' ? '#0071E3' : '#B86800',
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature pills */}
        <div
          className="flex flex-wrap justify-center gap-3 mt-10"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s ease 0.6s',
          }}
        >
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground"
              style={{
                background: 'rgba(255,255,255,0.9)',
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <Icon name={f.icon as any} size={14} className="text-primary" />
              {f.label}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="text-center mt-10"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s ease 0.8s',
          }}
        >
          <Link href="#get-quote" className="btn-register px-12 py-5 text-lg">
            Get Started
            <Icon name="ArrowRightIcon" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
