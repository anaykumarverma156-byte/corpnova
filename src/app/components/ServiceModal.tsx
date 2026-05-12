'use client';
import React, { useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
}

const EXPLANATIONS: Record<string, string> = {
  'Private Limited Company': 'A Private Limited Company is a separate legal entity owned by shareholders with limited liability protection. It is the most preferred structure for startups and growing businesses in India, offering high credibility and ease of fundraising through equity. This structure ensures that personal assets are protected from business debts.',
  'LLP Registration': 'A Limited Liability Partnership (LLP) combines the flexibility of a traditional partnership with the benefit of limited liability for its partners. It is an ideal choice for professionals, micro and small businesses, as it has fewer compliance requirements compared to a company. No partner is liable for the unauthorized actions or negligence of other partners.',
  'GST Registration': 'Goods and Services Tax (GST) is a comprehensive, multi-stage, destination-based tax that replaced most indirect taxes in India. It simplifies the tax structure, eliminates the cascading effect of taxes, and enables a seamless flow of input tax credit across the supply chain. Every business with a turnover above the prescribed limit must register to stay compliant.',
  'Trademark Registration': 'A Trademark is a unique symbol, design, or expression used to identify a business and its products, distinguishing them from competitors. Registering a trademark provides legal protection against brand infringement and gives the owner exclusive rights to use the mark. It is a valuable intangible asset that builds brand reputation and customer trust over time.',
  'FSSAI License': 'FSSAI Registration or License is mandatory for all Food Business Operators (FBOs) in India to ensure the quality and safety of food products. It is governed by the Food Safety and Standards Authority of India and helps in building consumer confidence by verifying adherence to food safety standards. The type of license required depends on the business\'s turnover and operation scale.',
  'Startup India': 'Startup India is a flagship government initiative aimed at building a strong ecosystem for nurturing innovation and startups in the country. Recognition under this scheme (DPIIT) unlocks various benefits including tax exemptions for three years, access to government funds, and relaxed norms for public procurement. It helps startups scale rapidly by providing intellectual property support and networking opportunities.'
};

import { useRouter } from 'next/navigation';

export default function ServiceModal({ isOpen, onClose, serviceTitle }: ServiceModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Clean title for the question
  const cleanTitle = serviceTitle.replace(/Registration|License|Company/gi, '').trim();
  const explanation = EXPLANATIONS[serviceTitle] || 'Information about this service will be provided by our experts.';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="XMarkIcon" size={20} />
          </button>

          <div className="space-y-6 mt-4 text-center">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Information</span>
              <h2 className="text-2xl font-display font-semibold text-foreground leading-tight">
                What is {cleanTitle}?
              </h2>
            </div>

            <div className="bg-secondary/30 p-6 rounded-2xl">
              <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                {explanation}
              </p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => {
                  onClose();
                  router.push('/#get-quote');
                }}
                className="w-full py-4 rounded-2xl bg-primary text-white font-semibold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                   <Icon name="ArrowRightIcon" size={16} />
                </div>
                Get Quote
              </button>
            </div>

            <p className="text-xs text-muted-foreground pt-2 italic">
              *Our experts will guide you through every step of the process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
