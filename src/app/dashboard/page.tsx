import React from 'react';
import DashboardLayout from '@/app/dashboard/components/DashboardLayout';
import DashboardOverview from '@/app/dashboard/components/DashboardOverview';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  );
}