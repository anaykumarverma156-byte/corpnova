import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import ServicesGridSection from '@/app/components/ServicesGridSection';
import TrustSection from '@/app/components/TrustSection';
import DashboardReveal from '@/app/components/DashboardReveal';
import StatsSection from '@/app/components/StatsSection';
import FinalCTA from '@/app/components/FinalCTA';

import GetQuoteForm from '@/app/components/GetQuoteForm';
import FAQSection from '@/app/components/FAQSection';

import { SHOW_DASHBOARD } from '@/components/Header';

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Header />
      <HeroSection />
      <StatsSection />
      <ServicesGridSection />
      <TrustSection />
      <DashboardReveal />
      <GetQuoteForm />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}