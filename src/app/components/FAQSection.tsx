'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const FAQS = [
  {
    question: 'How long does it take to register a Private Limited Company?',
    answer: 'Typically, it takes around 7–10 working days to get the Certificate of Incorporation, provided all documents are in order. This includes name approval, DSC, and DIN generation.'
  },
  {
    question: 'Is GST registration mandatory for all businesses?',
    answer: 'GST registration is mandatory for businesses with an annual turnover exceeding ₹40 lakhs (₹20 lakhs for service providers and North-Eastern states). It is also mandatory for e-commerce sellers and interstate traders.'
  },
  {
    question: 'What is the difference between an LLP and a Private Limited Company?',
    answer: 'An LLP is easier to manage with fewer compliance requirements, while a Private Limited Company offers better scalability and is preferred by investors for equity fundraising.'
  },
  {
    question: 'Can a single person start a company?',
    answer: 'Yes, you can register a One Person Company (OPC) which allows a single founder to enjoy the benefits of a corporate structure with limited liability.'
  },
  {
    question: 'What documents are required for Trademark registration?',
    answer: 'You usually need a soft copy of the logo, identity proof of the applicant, and a power of attorney if filed through an agent. If the mark is already in use, a user affidavit is required.'
  },
  {
    question: 'Do I need a physical office to register a company?',
    answer: 'Yes, a registered office address is required. However, it can be a residential address or a virtual office as long as you have proof of ownership or a NOC from the owner.'
  },
  {
    question: 'What are the benefits of Startup India recognition?',
    answer: 'Benefits include tax exemptions for three consecutive years, access to government funding schemes, relaxed norms for public procurement, and fast-tracked patent applications.'
  },
  {
    question: 'Is it necessary to renew my FSSAI license?',
    answer: 'Yes, FSSAI licenses are issued for a period of 1 to 5 years and must be renewed at least 30 days before the expiry date to avoid penalties.'
  }
];

function FAQItem({ faq, isOpen, onClick }: { faq: typeof FAQS[0], isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-border/40">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
          {faq.question}
        </span>
        <div className={`w-8 h-8 rounded-full border border-border/60 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary border-primary rotate-45' : 'group-hover:border-primary'}`}>
          <Icon name="PlusIcon" size={14} className={isOpen ? 'text-white' : 'text-muted-foreground'} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-48 pb-6' : 'max-h-0'}`}>
        <p className="text-muted-foreground leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4 block">Common Questions</span>
          <h2 className="text-4xl font-display font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about business registration and compliance.</p>
        </div>

        <div className="glass-card rounded-3xl p-8 md:p-12">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
