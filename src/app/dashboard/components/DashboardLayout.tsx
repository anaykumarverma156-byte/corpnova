'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const NAV_ITEMS = [
  { icon: 'Squares2X2Icon', label: 'Overview', id: 'overview' },
  { icon: 'DocumentTextIcon', label: 'Registrations', id: 'registrations' },
  { icon: 'FolderIcon', label: 'Documents', id: 'documents' },
  { icon: 'CalendarIcon', label: 'Compliance', id: 'compliance' },
  { icon: 'BanknotesIcon', label: 'Payments', id: 'payments' },
  { icon: 'QuestionMarkCircleIcon', label: 'Support', id: 'support' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [activeNav, setActiveNav] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex" style={{ background: '#F5F5F7' }}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        {/* Logo */}
        <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <Link href="/" className="flex items-center gap-2.5">
            <AppLogo size={28} />
            <span className="font-display text-base font-semibold tracking-tight text-foreground">
              Register Startup
            </span>
          </Link>
        </div>

        {/* Company badge */}
        <div className="px-4 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{ background: 'rgba(0,113,227,0.06)', border: '1px solid rgba(0,113,227,0.12)' }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'rgba(0,113,227,0.12)' }}
            >
              <span className="text-xs font-bold text-primary">CN</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-foreground truncate">Register Startup Technologies</div>
              <div className="text-xs text-muted-foreground">Pvt Ltd · CIN Active</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-hide">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left dash-sidebar-link ${
                activeNav === item.id ? 'active' : 'text-muted-foreground'
              }`}
            >
              <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)' }}
            >
              <Icon name="UserIcon" size={16} className="text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-foreground">Arjun Mehta</div>
              <div className="text-xs text-muted-foreground truncate">founder@registerstartup.in</div>
            </div>
            <Link
              href="/"
              className="p-1.5 rounded-lg transition-colors"
              style={{ background: 'transparent' }}
            >
              <Icon name="ArrowLeftOnRectangleIcon" size={14} className="text-muted-foreground" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between px-5 py-4"
          style={{
            background: 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0,0,0,0.07)',
          }}
        >
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ background: 'rgba(0,0,0,0.04)' }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <Icon name="Bars3Icon" size={20} className="text-foreground" />
            </button>
            <div>
              <h1 className="text-sm font-semibold text-foreground">Founder Dashboard</h1>
              <p className="text-xs text-muted-foreground">Welcome back, Arjun</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg transition-colors relative"
              style={{ background: 'rgba(0,0,0,0.03)' }}
            >
              <Icon name="BellIcon" size={18} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
            </button>
            <Link href="/services" className="btn-register text-xs py-2 px-4 hidden sm:flex">
              + New Service
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}