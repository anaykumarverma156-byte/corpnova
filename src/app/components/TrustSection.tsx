'use client';
import React, { useRef, useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const TRUST_FEATURES = [
  {
    icon: 'LockClosedIcon',
    title: 'Bank-Grade Encryption',
    desc: 'All documents encrypted with AES-256. Your data never leaves Indian servers.',
  },
  {
    icon: 'ShieldCheckIcon',
    title: 'MCA21 Direct Integration',
    desc: 'We file directly on government portals — no intermediaries, no delays.',
  },
  {
    icon: 'DocumentDuplicateIcon',
    title: 'Secure Document Vault',
    desc: 'Permanent encrypted storage for all incorporation documents and certificates.',
  },
  {
    icon: 'CheckBadgeIcon',
    title: 'Compliance Monitoring',
    desc: 'Automated reminders for ROC filings, GST returns, and annual compliances.',
  },
];

export default function TrustSection() {
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
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: '#F5F5F7' }}
    >
      {/* Subtle 3D depth background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(0,113,227,0.05) 0%, transparent 60%)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div>
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Trust & Security
            </span>
            <h2
              className="text-section-title font-display mb-6"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
              }}
            >
              <span className="gradient-text">Built for Founders.</span>
              <br />
              <span className="italic font-light gradient-text-blue">Engineered for Trust.</span>
            </h2>
            <p
              className="text-lg text-muted-foreground font-light leading-relaxed mb-10 max-w-lg"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
              }}
            >
              Your business formation is a critical legal process. We treat it with the
              precision of enterprise infrastructure and the care of a trusted advisor.
            </p>

            {/* Security indicators */}
            <div
              className="flex flex-wrap gap-3"
              style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 1s ease 0.4s',
              }}
            >
              {['ISO 27001', 'DPDP Compliant', 'MCA Registered', 'SSL Secured'].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground"
                  style={{
                    background: 'rgba(255,255,255,0.9)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  }}
                >
                  <Icon name="CheckCircleIcon" size={12} variant="solid" className="text-green-500" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Feature cards with 3D effect */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRUST_FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className="rounded-2xl p-5 group transition-all duration-400 cursor-default"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + i * 0.1}s`,
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: 'rgba(0,113,227,0.08)',
                    border: '1px solid rgba(0,113,227,0.12)',
                  }}
                >
                  <Icon name={feature.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-primary" />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1.5">{feature.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}