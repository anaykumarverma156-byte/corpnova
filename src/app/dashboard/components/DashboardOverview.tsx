'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const MONTHLY_DATA = [
  { month: 'Nov', filings: 2, documents: 5 },
  { month: 'Dec', filings: 3, documents: 8 },
  { month: 'Jan', filings: 1, documents: 4 },
  { month: 'Feb', filings: 4, documents: 11 },
  { month: 'Mar', filings: 3, documents: 9 },
  { month: 'Apr', filings: 5, documents: 14 },
  { month: 'May', filings: 2, documents: 7 },
];

const COMPLIANCE_DATA = [
  { name: 'Completed', value: 8, color: '#10B981' },
  { name: 'Pending', value: 3, color: '#F59E0B' },
  { name: 'Upcoming', value: 5, color: '#2563EB' },
];

const REGISTRATIONS = [
  {
    id: 'CIN-2024-0312',
    name: 'Private Limited Company',
    status: 'active',
    statusLabel: 'Active',
    completedOn: '12 Mar 2024',
    progress: 100,
  },
  {
    id: 'GST-27AABCC',
    name: 'GST Registration',
    status: 'active',
    statusLabel: 'Active',
    completedOn: '18 Mar 2024',
    progress: 100,
  },
  {
    id: 'TM-2024-5521',
    name: 'Trademark — CorpNova',
    status: 'processing',
    statusLabel: 'Under Examination',
    completedOn: 'Filed 02 Apr 2024',
    progress: 65,
  },
  {
    id: 'MSME-MH-2024',
    name: 'MSME / Udyam Registration',
    status: 'pending',
    statusLabel: 'Documents Awaited',
    completedOn: 'Started 05 May 2024',
    progress: 30,
  },
];

const DOCUMENTS = [
  { name: 'Certificate of Incorporation', type: 'PDF', size: '245 KB', date: '12 Mar 2024' },
  { name: 'Memorandum of Association', type: 'PDF', size: '180 KB', date: '12 Mar 2024' },
  { name: 'Articles of Association', type: 'PDF', size: '210 KB', date: '12 Mar 2024' },
  { name: 'GST Certificate', type: 'PDF', size: '95 KB', date: '18 Mar 2024' },
  { name: 'PAN Card (Company)', type: 'PDF', size: '45 KB', date: '12 Mar 2024' },
];

const COMPLIANCE_ITEMS = [
  { task: 'ROC Annual Return (MGT-7)', due: '30 Sep 2024', status: 'upcoming', priority: 'High' },
  { task: 'Financial Statements (AOC-4)', due: '30 Sep 2024', status: 'upcoming', priority: 'High' },
  { task: 'GST Annual Return (GSTR-9)', due: '31 Dec 2024', status: 'upcoming', priority: 'Medium' },
  { task: 'Advance Tax Q1', due: '15 Jun 2024', status: 'pending', priority: 'High' },
  { task: 'GSTR-1 (May 2024)', due: '11 Jun 2024', status: 'pending', priority: 'Medium' },
];

const STAT_CARDS = [
  { label: 'Active Registrations', value: '4', icon: 'BuildingOffice2Icon', change: '+1 this month', positive: true },
  { label: 'Documents Stored', value: '23', icon: 'FolderIcon', change: '+5 this week', positive: true },
  { label: 'Compliance Tasks', value: '5', icon: 'ExclamationTriangleIcon', change: '2 due soon', positive: false },
  { label: 'Total Invested', value: '₹18,496', icon: 'BanknotesIcon', change: 'Across 4 services', positive: true },
];

export default function DashboardOverview() {
  const [activeTab, setActiveTab] = useState<'registrations' | 'documents' | 'compliance'>('registrations');

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="relative glass-card rounded-2xl p-6 overflow-hidden border border-primary/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob-primary absolute w-[400px] h-[200px] -right-20 top-1/2 -translate-y-1/2 opacity-30" />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="status-badge-active text-xs px-2.5 py-0.5 rounded-full font-semibold">
                Company Active
              </span>
            </div>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-1">
              CorpNova Technologies Pvt Ltd
            </h2>
            <p className="text-sm text-muted-foreground">
              CIN: U72900MH2024PTC412381 · Incorporated 12 Mar 2024 · Mumbai, Maharashtra
            </p>
          </div>
          <Link href="/services" className="btn-register text-sm py-2.5 px-5 shrink-0">
            + Add Service
            <Icon name="PlusIcon" size={16} />
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <div key={card.label} className="glass-card rounded-2xl p-4 card-glow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                <Icon name={card.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-primary" />
              </div>
              <span className={`text-xs font-medium ${card.positive ? 'text-green-500' : 'text-yellow-500'}`}>
                {card.change}
              </span>
            </div>
            <div className="text-2xl font-bold font-display text-foreground mb-1">{card.value}</div>
            <div className="text-xs text-muted-foreground">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Area chart */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Filing Activity</h3>
              <p className="text-xs text-muted-foreground">Filings & documents over 7 months</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MONTHLY_DATA}>
              <defs>
                <linearGradient id="colorFilings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8E8E9A' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8E8E9A' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#111118', border: '1px solid #2A2A3A', borderRadius: '8px', fontSize: '12px' }}
                labelStyle={{ color: '#F5F5F7' }}
                itemStyle={{ color: '#8E8E9A' }}
              />
              <Area type="monotone" dataKey="filings" stroke="#2563EB" strokeWidth={2} fill="url(#colorFilings)" name="Filings" />
              <Area type="monotone" dataKey="documents" stroke="#0EA5E9" strokeWidth={2} fill="url(#colorDocs)" name="Documents" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="glass-card rounded-2xl p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Compliance Status</h3>
            <p className="text-xs text-muted-foreground">Current filing health</p>
          </div>
          <div className="flex justify-center mb-4">
            <PieChart width={160} height={160}>
              <Pie
                data={COMPLIANCE_DATA}
                cx={80}
                cy={80}
                innerRadius={48}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
              >
                {COMPLIANCE_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="space-y-2">
            {COMPLIANCE_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-semibold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabbed section */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-border/40">
          {(['registrations', 'documents', 'compliance'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3.5 text-sm font-medium capitalize transition-all duration-200 ${
                activeTab === tab
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Registrations Tab */}
        {activeTab === 'registrations' && (
          <div className="divide-y divide-border/30">
            {REGISTRATIONS.map((reg) => (
              <div key={reg.id} className="px-5 py-4 hover:bg-secondary/20 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-sm font-semibold text-foreground">{reg.name}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          reg.status === 'active' ?'status-badge-active'
                            : reg.status === 'processing' ?'status-badge-processing' :'status-badge-pending'
                        }`}
                      >
                        {reg.statusLabel}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">{reg.id} · {reg.completedOn}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-foreground">{reg.progress}%</div>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-secondary/60 overflow-hidden">
                  <div
                    className="h-full progress-bar rounded-full transition-all duration-700"
                    style={{ width: `${reg.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="divide-y divide-border/30">
            {DOCUMENTS.map((doc) => (
              <div key={doc.name} className="px-5 py-4 flex items-center justify-between hover:bg-secondary/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon name="DocumentTextIcon" size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{doc.name}</div>
                    <div className="text-xs text-muted-foreground">{doc.type} · {doc.size} · {doc.date}</div>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-secondary/60 transition-colors">
                  <Icon name="ArrowDownTrayIcon" size={15} className="text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Compliance Tab */}
        {activeTab === 'compliance' && (
          <div className="divide-y divide-border/30">
            {COMPLIANCE_ITEMS.map((item) => (
              <div key={item.task} className="px-5 py-4 flex items-center justify-between hover:bg-secondary/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      item.status === 'upcoming' ? 'bg-primary' : 'bg-yellow-500'
                    }`}
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground">{item.task}</div>
                    <div className="text-xs text-muted-foreground">Due: {item.due}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      item.priority === 'High' ? 'status-badge-pending' : 'status-badge-processing'
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}