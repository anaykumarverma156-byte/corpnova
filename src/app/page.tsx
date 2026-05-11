import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import ServicesGridSection from '@/app/components/ServicesGridSection';
import TrustSection from '@/app/components/TrustSection';
import DashboardReveal from '@/app/components/DashboardReveal';
import StatsSection from '@/app/components/StatsSection';
import FinalCTA from '@/app/components/FinalCTA';

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Header />
      <HeroSection />
      <StatsSection />
      <ServicesGridSection />
      <TrustSection />
      <DashboardReveal />
      <FinalCTA />
      <Footer />
    </main>
  );
}