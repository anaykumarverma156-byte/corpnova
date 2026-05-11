import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesHero from '@/app/services/components/ServicesHero';
import ServicesCatalog from '@/app/services/components/ServicesCatalog';
import ServicesCTA from '@/app/services/components/ServicesCTA';

export default function ServicesPage() {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Header />
      <ServicesHero />
      <ServicesCatalog />
      <ServicesCTA />
      <Footer />
    </main>
  );
}