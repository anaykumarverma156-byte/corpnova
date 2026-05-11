'use client';
import React, { useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface DocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
}

export default function DocumentsModal({ isOpen, onClose, serviceTitle }: DocumentsModalProps) {
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

  const dummyDocs = [
    'Document Form 1 - Identity Proof',
    'Document Form 2 - Address Proof',
    'Document Form 3 - Business Proof',
    'Passport Size Photographs',
    'Digital Signature Certificate',
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="XMarkIcon" size={20} />
          </button>

          <div className="space-y-6 mt-4">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Checklist</span>
              <h2 className="text-2xl font-display font-semibold text-foreground leading-tight">
                Documents Required
              </h2>
              <p className="text-xs text-muted-foreground">For {serviceTitle}</p>
            </div>

            <div className="space-y-3">
              {dummyDocs.map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/40 group hover:bg-secondary/50 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Icon name="CheckIcon" size={12} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{doc}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button 
                onClick={onClose}
                className="w-full py-4 rounded-2xl bg-secondary text-foreground font-semibold hover:bg-secondary/80 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
