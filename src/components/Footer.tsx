import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer
      className="py-8"
      style={{ borderTop: '1px solid rgba(0,0,0,0.08)', background: '#F5F5F7' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <AppLogo size={28} />
          <span className="font-display text-base font-semibold tracking-tight text-foreground">
            CorpNova
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link href="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Services</Link>
          <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
        </nav>

        <p className="text-sm text-muted-foreground">
          © 2026 CorpNova. All rights reserved.
        </p>
      </div>
    </footer>
  );
}