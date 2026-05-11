'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import confetti from 'canvas-confetti';
import Icon from '@/components/ui/AppIcon';

const quoteSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  whatsapp: z.string().optional(),
  enquiry: z.string().min(10, 'Please describe your enquiry in more detail'),
  consent: z.boolean().refine((val) => val === true, 'Consent is required'),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export default function GetQuoteForm() {
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<QuoteFormValues | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmitForm = async (data: QuoteFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/quote/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });
      if (!res.ok) throw new Error('Failed to send OTP');
      setFormData(data);
      setStep('otp');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/quote/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, otp }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Invalid OTP');
      }
      
      setStep('success');
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0071E3', '#34AADC', '#FFFFFF']
      });
      reset();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = (hasError: boolean) => 
    `w-full px-4 py-3 rounded-xl border outline-none transition-all ${
      hasError 
        ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200' 
        : 'border-border bg-white focus:ring-2 focus:ring-primary/20'
    }`;

  const labelClasses = (hasError: boolean) => 
    `text-xs font-bold uppercase tracking-wider ${
      hasError ? 'text-red-600' : 'text-muted-foreground'
    }`;

  return (
    <section className="py-24 bg-secondary/10" id="get-quote">
      <div className="max-w-4xl mx-auto px-6">
        <div className="glass-card rounded-3xl overflow-hidden grid md:grid-cols-5 shadow-2xl">
          <div className="md:col-span-2 bg-primary p-10 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-display font-semibold mb-4">Get a Custom Quote</h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-8">
                Fill out the form and our experts will get back to you with a personalized quotation for your business needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="CheckIcon" size={18} className="text-white" />
                  <span className="text-sm">Expert Consultation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="CheckIcon" size={18} className="text-white" />
                  <span className="text-sm">Transparent Pricing</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="CheckIcon" size={18} className="text-white" />
                  <span className="text-sm">Fast Turnaround</span>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-white/10">
              <p className="text-xs text-primary-foreground/60">
                Response within 48 hours.
              </p>
            </div>
          </div>

          <div className="md:col-span-3 bg-white p-10">
            {step === 'form' ? (
              <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={labelClasses(!!errors.fullName)}>Full Name</label>
                    <input 
                      {...register('fullName')}
                      placeholder="Your Name"
                      className={inputClasses(!!errors.fullName)}
                    />
                    {errors.fullName && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.fullName.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className={labelClasses(!!errors.email)}>Email Address</label>
                    <input 
                      {...register('email')}
                      placeholder="email@example.com"
                      className={inputClasses(!!errors.email)}
                    />
                    {errors.email && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={labelClasses(!!errors.phone)}>Phone Number</label>
                    <input 
                      {...register('phone')}
                      placeholder="+91 00000 00000"
                      className={inputClasses(!!errors.phone)}
                    />
                    {errors.phone && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">WhatsApp (Optional)</label>
                    <input 
                      {...register('whatsapp')}
                      placeholder="+91 00000 00000"
                      className={inputClasses(false)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className={labelClasses(!!errors.enquiry)}>Your Enquiry</label>
                  <textarea 
                    {...register('enquiry')}
                    placeholder="Please describe your enquiry here..."
                    rows={4}
                    className={inputClasses(!!errors.enquiry) + " resize-none"}
                  />
                  {errors.enquiry && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.enquiry.message}</p>}
                </div>

                <div className={`flex items-start gap-3 py-2 rounded-xl transition-all ${errors.consent ? 'bg-red-50 p-2 border border-red-200' : ''}`}>
                  <input 
                    type="checkbox" 
                    {...register('consent')}
                    className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <label className={`text-xs leading-relaxed ${errors.consent ? 'text-red-600 font-bold' : 'text-muted-foreground'}`}>
                    I consent to receiving updates via Email and WhatsApp regarding my enquiry.
                  </label>
                </div>
                {errors.consent && <p className="text-[10px] text-red-600 mt-1 font-bold">{errors.consent.message}</p>}

                {error && <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg font-bold border border-red-200">{error}</div>}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full btn-register py-4 disabled:opacity-50"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP & Proceed'}
                </button>
              </form>
            ) : step === 'otp' ? (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                    <Icon name="EnvelopeIcon" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Verify Your Email</h3>
                  <p className="text-sm text-muted-foreground">
                    We've sent a 6-digit OTP to <strong>{formData?.email}</strong>. Please enter it below to confirm your enquiry.
                  </p>
                </div>

                <form onSubmit={onVerifyOtp} className="space-y-4">
                  <input 
                    type="text" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className={`w-full text-center text-2xl tracking-[0.5em] font-bold px-4 py-4 rounded-xl border focus:ring-2 outline-none transition-all ${
                      error ? 'border-red-500 bg-red-50 focus:ring-red-200' : 'border-border focus:ring-primary/20'
                    }`}
                    maxLength={6}
                  />
                  {error && <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg text-center font-bold border border-red-200">{error}</div>}
                  <button 
                    type="submit" 
                    disabled={loading || otp.length < 6}
                    className="w-full btn-register py-4 disabled:opacity-50"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP & Submit'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setStep('form')}
                    className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Back to Form
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center space-y-6 py-10 animate-hero-reveal">
                <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center text-green-500 mx-auto mb-6 border border-green-100 shadow-sm">
                  <Icon name="CheckIcon" size={40} variant="outline" strokeWidth={3} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-display font-bold gradient-text">Success!</h3>
                  <p className="text-lg font-medium text-foreground">
                    Making first step towards Unicorn
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    Your enquiry has been received. Our expert advisors will contact you shortly via email and phone.
                  </p>
                </div>
                <div className="pt-6">
                  <button 
                    onClick={() => setStep('form')}
                    className="btn-register px-10 py-3"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
