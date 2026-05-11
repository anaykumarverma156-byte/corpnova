'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import ServiceModal from '@/app/components/ServiceModal';
import DocumentsModal from '@/app/components/DocumentsModal';

const CATEGORIES = [
  {
    id: 'formation',
    label: 'Business Formation',
    icon: 'BuildingOffice2Icon',
    services: [
      {
        name: 'Sole Proprietorship',
        popular: false,
        features: ['GST Registration', 'MSME/Udyam', 'Shop & Establishment', 'Bank Account Opening'],
        description: 'The simplest business form where an individual owns and runs the business. Minimum compliance and easy to start.',
      },
      {
        name: 'Partnership Firm',
        popular: false,
        features: ['Partnership Deed', 'Registration with Registrar', 'PAN & TAN', 'Simplified Compliance'],
        description: 'A traditional structure for small businesses where partners share profits and liabilities. Easy to set up and manage.',
      },
      {
        name: 'Limited Liability Partnership',
        popular: false,
        features: ['LLP Agreement', 'DPIN for Partners', 'PAN & TAN', 'Designated Partner Registration'],
        description: 'Flexible structure combining partnership benefits with corporate liability protection. Ideal for professionals.',
      },
      {
        name: 'One Person Company',
        popular: false,
        features: ['Single Director Setup', 'Nominee Director', 'MOA & AOA', 'PAN & TAN'],
        description: 'Perfect for solo entrepreneurs wanting corporate structure without partners.',
      },
      {
        name: 'Private Limited Company',
        popular: true,
        features: ['MOA & AOA Drafting', 'DIN for 2 Directors', 'PAN & TAN', 'Bank Account Assistance'],
        description: 'The gold standard for startups. Separate legal entity with limited liability protection and easy equity fundraising.',
      },
      {
        name: 'Public Limited Company',
        popular: false,
        features: ['Minimum 7 Members', 'Public Share Issue', 'Higher Capital Base', 'Greater Compliance'],
        description: 'Ideal for large-scale operations and businesses intending to list on stock exchanges. High credibility and capital access.',
      },
      {
        name: 'Trust/Society',
        popular: false,
        features: ['Deed Registration', 'Bylaws Drafting', 'Charity Commissioner Filing', '12A & 80G Support'],
        description: 'Formation of non-profit entities for social, educational, or religious welfare. Robust structure for NGOs.',
      },
      {
        name: 'Section 8 Company (NGO)',
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
        popular: true,
        features: ['GSTIN Certificate', 'ARN Generation', 'Portal Setup', 'Filing Guidance'],
        description: 'Mandatory for businesses above ₹20L turnover. Get your GSTIN quickly with complete documentation.',
      },
      {
        name: 'GST Return Filing',
        popular: false,
        features: ['GSTR-1 Filing', 'GSTR-3B Filing', 'ITC Reconciliation', 'Late Fee Management'],
        description: 'Hassle-free monthly GST return filing by our expert team of chartered accountants.',
      },
      {
        name: 'LUT Registration',
        popular: false,
        features: ['Letter of Undertaking', 'Export without GST', 'Annual Renewal', 'Portal Submission'],
        description: 'Letter of Undertaking (LUT) for exporters to supply goods or services without paying IGST. Essential for maintaining cash flow.',
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
        popular: true,
        features: ['TM Search', 'Class Identification', 'IP India Filing', 'TM Certificate'],
        description: 'Protect your brand name, logo, and tagline. Complete trademark filing with IP India.',
      },
      {
        name: 'Copyright Registration',
        popular: false,
        features: ['Work Registration', 'Certificate Issuance', 'Legal Protection', 'Portfolio Protection'],
        description: 'Register copyright for creative works, software, music, and literary content.',
      },
    ],
  },
  {
    id: 'licenses',
    label: 'Licenses & Certifications',
    icon: 'DocumentCheckIcon',
    services: [
      {
        name: 'Startup India Recognition',
        popular: true,
        features: ['DPIIT Certificate', 'Tax Exemptions', 'Fund Access', 'IPR Benefits'],
        description: 'DPIIT recognition unlocking tax exemptions, funding access, and government scheme eligibility.',
      },
      {
        name: 'FSSAI License',
        popular: false,
        features: ['Basic/State/Central', 'Documentation', 'Portal Filing', 'Certificate Delivery'],
        description: 'Mandatory food business license. We handle Basic, State, and Central FSSAI applications.',
      },
      {
        name: 'Trade License',
        popular: false,
        features: ['Municipal Permission', 'Business Operation License', 'Renewal Support', 'Local Compliance'],
        description: 'Mandatory permission from local municipal authorities to carry out specific trades or businesses in a given area.',
      },
      {
        name: 'MSME / Udyam Registration',
        popular: true,
        features: ['Udyam Certificate', 'Benefits Access', 'Subsidy Eligibility', 'Priority Lending'],
        description: 'Get recognized as MSME to access government subsidies, priority lending, and tenders.',
      },
      {
        name: 'IEC Registration',
        popular: false,
        features: ['Import Export Code', 'DGFT Filing', 'Digital Certificate', 'Customs Access'],
        description: 'Import Export Code from DGFT — mandatory for any business involved in international trade.',
      },
      {
        name: 'Government Subsidy',
        popular: false,
        features: ['PMEGP Support', 'CLCSS Guidance', 'Interest Subvention', 'Application Support'],
        description: 'Assistance in identifying and applying for central and state government subsidies for MSMEs and startups.',
      },
    ],
  },
  {
    id: 'funding',
    label: 'Funding Required',
    icon: 'CurrencyRupeeIcon',
    services: [
      {
        name: 'Project Financing',
        popular: true,
        features: ['Debt & Equity Support', 'Bank Loan Assistance', 'Term Sheet Negotiation', '1:1 Professional Consultation'],
        description: 'Secure capital for your business ventures with expert assistance in debt, equity, and hybrid financing models. 1-to-1 professional consultation will be provided.',
      },
      {
        name: 'Project Report',
        popular: false,
        features: ['Detailed Feasibility Study', 'CMA Data Preparation', 'Technical Analysis', '1:1 Professional Consultation'],
        description: 'Comprehensive project reports and feasibility studies required for securing bank loans and government subsidies. 1-to-1 professional consultation will be provided.',
      },
      {
        name: 'Project Consultancy',
        popular: false,
        features: ['Project Planning', 'Resource Optimization', 'Risk Assessment', '1:1 Professional Consultation'],
        description: 'Expert end-to-end guidance on project conceptualization, planning, and execution strategies. 1-to-1 professional consultation will be provided.',
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
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
          <div className="flex items-center gap-3 shrink-0 ml-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setModalOpen(true);
              }}
              className="hidden md:block px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-tight hover:bg-primary hover:text-white transition-all"
            >
              More Info
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setDocsOpen(true);
              }}
              className="hidden lg:block px-4 py-2 rounded-full border border-border/50 bg-secondary/20 text-muted-foreground text-[10px] font-bold uppercase tracking-tight hover:border-primary hover:text-primary transition-all"
            >
              Documents Required
            </button>
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
          className={`overflow-hidden transition-all duration-500 ${expanded ? 'max-h-[500px]' : 'max-h-0'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <div className="px-6 md:pl-20 pb-6">
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xl">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setModalOpen(true)}
                className="btn-register text-xs py-2.5 px-6"
              >
                More Info
              </button>
              <button 
                onClick={() => setDocsOpen(true)}
                className="px-6 py-2.5 rounded-full border border-border text-muted-foreground text-xs font-semibold hover:border-primary hover:text-primary transition-all"
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
        serviceTitle={service.name} 
      />
      <DocumentsModal
        isOpen={docsOpen}
        onClose={() => setDocsOpen(false)}
        serviceTitle={service.name}
      />
    </>
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