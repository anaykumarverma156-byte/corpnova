'use client';
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import ServiceModal from './ServiceModal';
import DocumentsModal from './DocumentsModal';

const SERVICES = [
  {
    id: 1,
    icon: 'BuildingOffice2Icon',
    title: 'Private Limited Company',
    description: 'The most preferred structure for startups. Separate legal entity, limited liability, and easy fundraising.',
    tag: 'Most Popular',
    color: 'rgba(0,113,227,0.07)',
    borderColor: 'rgba(0,113,227,0.15)',
  },
  {
    id: 2,
    icon: 'UsersIcon',
    title: 'LLP Registration',
    description: 'Flexible partnership with limited liability. Ideal for professionals and service businesses.',
    tag: 'Professionals',
    color: 'rgba(52,170,220,0.06)',
    borderColor: 'rgba(52,170,220,0.15)',
  },
  {
    id: 3,
    icon: 'ReceiptPercentIcon',
    title: 'GST Registration',
    description: 'Mandatory for businesses above ₹20L turnover. Get your GSTIN in 3–5 working days.',
    tag: 'Tax & Compliance',
    color: 'rgba(0,113,227,0.05)',
    borderColor: 'rgba(0,113,227,0.12)',
  },
  {
    id: 4,
    icon: 'ShieldCheckIcon',
    title: 'Trademark Registration',
    description: 'Protect your brand name and logo. TM filing with IP India, complete documentation handled.',
    tag: 'IP Protection',
    color: 'rgba(52,170,220,0.06)',
    borderColor: 'rgba(52,170,220,0.15)',
  },
  {
    id: 5,
    icon: 'DocumentCheckIcon',
    title: 'FSSAI License',
    description: 'Food business operators must obtain FSSAI. Basic, State, or Central license based on turnover.',
    tag: 'Food Business',
    color: 'rgba(0,113,227,0.05)',
    borderColor: 'rgba(0,113,227,0.12)',
  },
  {
    id: 6,
    icon: 'RocketLaunchIcon',
    title: 'Startup India',
    description: 'DPIIT recognition for tax exemptions, funding access, and government scheme eligibility.',
    tag: 'Growth',
    color: 'rgba(0,113,227,0.07)',
    borderColor: 'rgba(0,113,227,0.15)',
  },
];

function ServiceCard({ service, delay }: { service: typeof SERVICES[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -6;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 6;
    setTilt({ x: rx, y: ry });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl p-6 cursor-pointer overflow-hidden group"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? `translateY(0) perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'translateZ(8px)' : ''}`
            : 'translateY(40px)',
          transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
          background: hovered ? service.color : 'rgba(255,255,255,1)',
          border: `1px solid ${hovered ? service.borderColor : 'rgba(0,0,0,0.07)'}`,
          boxShadow: hovered
            ? `0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,113,227,0.08)`
            : '0 2px 12px rgba(0,0,0,0.04)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(0,113,227,0.08)',
                border: '1px solid rgba(0,113,227,0.12)',
              }}
            >
              <Icon name={service.icon as Parameters<typeof Icon>[0]['name']} size={22} className="text-primary" />
            </div>
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(0,0,0,0.04)',
                color: '#6E6E73',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              {service.tag}
            </span>
          </div>

          <h3 className="text-card-title font-display font-semibold text-foreground mb-2">
            {service.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            {service.description}
          </p>

          <div className="flex flex-col gap-3 pt-4 mt-auto" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="flex items-center justify-between">
              <button 
                onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
                className="text-[11px] font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
              >
                More Info
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setDocsOpen(true); }}
                className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
              >
                Documents Required
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <ServiceModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        serviceTitle={service.title} 
      />
      <DocumentsModal
        isOpen={docsOpen}
        onClose={() => setDocsOpen(false)}
        serviceTitle={service.title}
      />
    </>
  );
}

export default function ServicesGridSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTitleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white">
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,113,227,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Registration Ecosystem
          </span>
          <h2 className="text-3xl md:text-4xl font-display gradient-text mb-5">
            Every Service Your
            <br />
            <span className="italic font-light gradient-text-blue">Business Needs.</span>
          </h2>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg font-light leading-relaxed">
            From day one to scale — complete legal infrastructure for Indian founders.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} delay={i * 80} />
          ))}
        </div>

        {/* More services CTA */}
        <div
          className="text-center mt-12"
          style={{
            opacity: titleVisible ? 1 : 0,
            transition: 'opacity 1s ease 0.6s',
          }}
        >
          <Link href="/services" className="btn-ghost text-sm px-8 py-3.5">
            View All 20+ Services
            <Icon name="ChevronRightIcon" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}