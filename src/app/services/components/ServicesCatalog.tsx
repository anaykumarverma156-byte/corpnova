'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const CATEGORIES = [
  {
    id: 'formation',
    label: 'Company Formation',
    icon: 'BuildingOffice2Icon',
    services: [
      {
        name: 'Private Limited Company',
        price: '₹6,999',
        timeline: '7–10 days',
        popular: true,
        features: ['MOA & AOA Drafting', 'DIN for 2 Directors', 'PAN & TAN', 'Bank Account Assistance'],
        description: 'The gold standard for startups. Separate legal entity with limited liability protection and easy equity fundraising.',
      },
      {
        name: 'Limited Liability Partnership',
        price: '₹5,499',
        timeline: '10–12 days',
        popular: false,
        features: ['LLP Agreement', 'DPIN for Partners', 'PAN & TAN', 'Designated Partner Registration'],
        description: 'Flexible structure combining partnership benefits with corporate liability protection. Ideal for professionals.',
      },
      {
        name: 'One Person Company',
        price: '₹4,999',
        timeline: '7–10 days',
        popular: false,
        features: ['Single Director Setup', 'Nominee Director', 'MOA & AOA', 'PAN & TAN'],
        description: 'Perfect for solo entrepreneurs wanting corporate structure without partners.',
      },
      {
        name: 'Section 8 Company (NGO)',
        price: '₹9,999',
        timeline: '15–20 days',
        popular: false,
        features: ['License from RoC', '80G & 12A Guidance', 'MOA & AOA', 'PAN & TAN'],
        description: 'For non-profit organizations focused on charitable, educational, or social objectives.',
      },
    ],
  },
  {
    id: 'tax',
    label: 'Tax & GST',
    icon: 'ReceiptPercentIcon',
    services: [
      {
        name: 'GST Registration',
        price: '₹1,499',
        timeline: '3–5 days',
        popular: true,
        features: ['GSTIN Certificate', 'ARN Generation', 'Portal Setup', 'Filing Guidance'],
        description: 'Mandatory for businesses above ₹20L turnover. Get your GSTIN quickly with complete documentation.',
      },
      {
        name: 'GST Return Filing',
        price: '₹799/month',
        timeline: 'Monthly',
        popular: false,
        features: ['GSTR-1 Filing', 'GSTR-3B Filing', 'ITC Reconciliation', 'Late Fee Management'],
        description: 'Hassle-free monthly GST return filing by our expert team of chartered accountants.',
      },
      {
        name: 'Professional Tax Registration',
        price: '₹1,999',
        timeline: '5–7 days',
        popular: false,
        features: ['PT Certificate', 'Employee PT Setup', 'Monthly Returns', 'State-Specific Filing'],
        description: 'Professional tax registration for employers in applicable Indian states.',
      },
    ],
  },
  {
    id: 'ip',
    label: 'IP & Trademarks',
    icon: 'ShieldCheckIcon',
    services: [
      {
        name: 'Trademark Registration',
        price: '₹7,999',
        timeline: '2–3 days (filing)',
        popular: true,
        features: ['TM Search', 'Class Identification', 'IP India Filing', 'TM Certificate'],
        description: 'Protect your brand name, logo, and tagline. Complete trademark filing with IP India.',
      },
      {
        name: 'Copyright Registration',
        price: '₹4,999',
        timeline: '7–10 days',
        popular: false,
        features: ['Work Registration', 'Certificate Issuance', 'Legal Protection', 'Portfolio Protection'],
        description: 'Register copyright for creative works, software, music, and literary content.',
      },
      {
        name: 'Patent Filing',
        price: '₹24,999',
        timeline: '30–45 days',
        popular: false,
        features: ['Prior Art Search', 'Patent Drafting', 'IPO Filing', 'Prosecution Support'],
        description: 'Protect your inventions and innovations with provisional or complete patent filing.',
      },
    ],
  },
  {
    id: 'licenses',
    label: 'Licenses & Certifications',
    icon: 'DocumentCheckIcon',
    services: [
      {
        name: 'FSSAI License',
        price: '₹2,499',
        timeline: '15–30 days',
        popular: false,
        features: ['Basic/State/Central', 'Documentation', 'Portal Filing', 'Certificate Delivery'],
        description: 'Mandatory food business license. We handle Basic, State, and Central FSSAI applications.',
      },
      {
        name: 'MSME / Udyam Registration',
        price: '₹999',
        timeline: '1–2 days',
        popular: true,
        features: ['Udyam Certificate', 'Benefits Access', 'Subsidy Eligibility', 'Priority Lending'],
        description: 'Get recognized as MSME to access government subsidies, priority lending, and tenders.',
      },
      {
        name: 'Startup India Recognition',
        price: '₹3,999',
        timeline: '5–7 days',
        popular: false,
        features: ['DPIIT Certificate', 'Tax Exemptions', 'Fund Access', 'IPR Benefits'],
        description: 'DPIIT recognition unlocking tax exemptions, funding access, and government scheme eligibility.',
      },
      {
        name: 'IEC Registration',
        price: '₹3,499',
        timeline: '3–5 days',
        popular: false,
        features: ['Import Export Code', 'DGFT Filing', 'Digital Certificate', 'Customs Access'],
        description: 'Import Export Code from DGFT — mandatory for any business involved in international trade.',
      },
    ],
  },
];

function ServiceRow({
  service,
  delay,
}: {
  service: (typeof CATEGORIES)[0]['services'][0];
  delay: number;
}) {
  const [expanded, setExpanded] = useState(false);
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
    <div
      ref={ref}
      className="border-b border-border/40 group cursor-pointer transition-colors hover:bg-card/40"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-20px)',
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <div
        className="px-6 py-5 md:py-6 flex items-center justify-between"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4 md:gap-8 flex-1 min-w-0">
          <span className="text-xs font-mono text-muted-foreground/60 hidden md:block w-8 shrink-0">
            {String(delay / 80 + 1).padStart(2, '0')}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {service.name}
              </h3>
              {service.popular && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25 font-semibold shrink-0">
                  Popular
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6 shrink-0 ml-4">
          <div className="hidden md:block text-right">
            <div className="text-base font-bold text-foreground">{service.price}</div>
            <div className="text-xs text-muted-foreground">{service.timeline}</div>
          </div>
          <div
            className={`w-8 h-8 rounded-full border border-border/60 flex items-center justify-center transition-all duration-300 ${
              expanded ? 'bg-primary border-primary rotate-45' : 'group-hover:border-primary'
            }`}
          >
            <Icon name="PlusIcon" size={14} className={expanded ? 'text-white' : 'text-muted-foreground'} />
          </div>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ${expanded ? 'max-h-96' : 'max-h-0'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="px-6 md:pl-20 pb-6">
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xl">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {service.features.map((feat) => (
              <span
                key={feat}
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-secondary/80 border border-border/50 text-muted-foreground"
              >
                <Icon name="CheckIcon" size={10} className="text-green-500" />
                {feat}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="btn-register text-sm py-2.5 px-6">
              Get Started — {service.price}
            </Link>
            <div className="text-xs text-muted-foreground">{service.timeline}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesCatalog() {
  const [activeCategory, setActiveCategory] = useState('formation');

  const current = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <section className="relative py-8 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-border/40 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-primary text-white' :'text-muted-foreground hover:text-foreground border border-border/50 hover:border-border'
              }`}
            >
              <Icon name={cat.icon as Parameters<typeof Icon>[0]['name']} size={14} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category header */}
        <div className="flex items-center gap-3 mb-6 px-6">
          <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center">
            <Icon name={current.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-primary" />
          </div>
          <h2 className="font-display text-xl font-semibold text-foreground">{current.label}</h2>
        </div>

        {/* Service rows */}
        <div className="glass-card rounded-2xl overflow-hidden">
          {current.services.map((service, i) => (
            <ServiceRow key={service.name} service={service} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}