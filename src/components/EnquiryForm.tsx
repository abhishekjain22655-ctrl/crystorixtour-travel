'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Phone, MessageCircle, Calendar, Users, MapPin, Sparkles } from 'lucide-react';
import { saveNewEnquiry } from '@/lib/storage';
import { agencyConfig, getWhatsAppLink } from '@/config/agency';

interface EnquiryFormProps {
  originPackageSlug?: string;
  originPackageTitle?: string;
  defaultDestination?: string;
  defaultTripType?: 'domestic' | 'international';
  onSuccess?: () => void;
}

export default function EnquiryForm({
  originPackageSlug,
  originPackageTitle,
  defaultDestination = '',
  defaultTripType = 'domestic',
  onSuccess,
}: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    tripType: defaultTripType,
    destinationPreference: defaultDestination,
    departureCity: '',
    travelDateApprox: '',
    adultsCount: 2,
    childrenCount: 0,
    approxBudgetINR: '₹50,000 - ₹1,00,000',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState<string | null>(null);

  const budgetOptions = [
    'Under ₹35,000',
    '₹35,000 - ₹75,000',
    '₹75,000 - ₹1,50,000',
    '₹1,50,000 - ₹3,00,000',
    '₹3,00,000 - ₹5,00,000',
    '₹5,00,000+ (Luxury & Bespoke)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Form validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    const cleanPhone = formData.phone.trim();
    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for communication.');
      return;
    }
    if (!formData.destinationPreference.trim()) {
      setErrorMessage('Please specify your preferred travel destination or region.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Genuinely save to persistent storage (and Supabase integration layer)
      const saved = saveNewEnquiry({
        fullName: formData.fullName.trim(),
        phone: cleanPhone.startsWith('+') ? cleanPhone : `+91 ${cleanPhone}`,
        email: formData.email.trim() || undefined,
        tripType: formData.tripType,
        destinationPreference: formData.destinationPreference.trim(),
        departureCity: formData.departureCity.trim() || 'Not Specified',
        travelDateApprox: formData.travelDateApprox || 'Flexible',
        adultsCount: Number(formData.adultsCount),
        childrenCount: Number(formData.childrenCount),
        approxBudgetINR: formData.approxBudgetINR,
        additionalNotes: formData.additionalNotes.trim() || undefined,
        originPackageSlug,
        originPackageTitle,
      });

      setSubmittedEnquiryId(saved.id);
      setStatus('success');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Error saving enquiry:', err);
      setErrorMessage('A temporary storage error occurred. Please try again or message our team directly on WhatsApp.');
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'success') {
    const waText = encodeURIComponent(
      `Hello! I just submitted custom trip enquiry #${submittedEnquiryId} for ${formData.destinationPreference} (${formData.adultsCount} adults). Looking forward to discussing the itinerary.`
    );
    const instantWhatsAppUrl = `https://wa.me/${agencyConfig.contact.whatsappNumber}?text=${waText}`;

    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-emerald-300 shadow-xl text-[#263442]">
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-serif-luxury font-bold text-[#12304A] mb-2">
          Enquiry Received Successfully!
        </h3>
        <p className="text-sm text-[#556877] max-w-md mx-auto mb-2 leading-relaxed">
          Thank you, <strong className="text-[#12304A]">{formData.fullName}</strong>. Your enquiry reference is{' '}
          <code className="text-xs font-mono font-semibold bg-[#F5F7FA] text-[#147D83] border border-[#E4E9EE] px-2 py-0.5 rounded">
            {submittedEnquiryId}
          </code>.
        </p>
        <p className="text-xs text-[#556877] max-w-sm mx-auto mb-6">
          Our destination specialist is reviewing your travel preferences for {formData.destinationPreference} and will share a customized day-wise proposal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={instantWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect Faster on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="w-full sm:w-auto px-5 py-3 rounded-full border border-[#E4E9EE] text-xs font-semibold text-[#556877] hover:text-[#12304A] hover:bg-[#F5F7FA] transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white text-[#263442] p-6 sm:p-9 rounded-3xl border border-[#E4E9EE] shadow-xl">
      {originPackageTitle && (
        <div className="p-3.5 rounded-xl bg-[#F5F7FA] border border-[#E4E9EE] flex items-center gap-2.5 text-xs text-[#12304A]">
          <Sparkles className="w-4 h-4 text-[#D8B779] shrink-0" />
          <span>
            Enquiring specifically for: <strong className="text-[#12304A]">{originPackageTitle}</strong>
          </span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Trip Type Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#12304A] mb-2">
          Trip Category
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, tripType: 'domestic' })}
            className={`py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-full border text-center transition-all cursor-pointer ${
              formData.tripType === 'domestic'
                ? 'bg-[#147D83] text-white border-[#147D83] shadow-sm'
                : 'bg-[#F5F7FA] text-[#556877] border-[#E4E9EE] hover:text-[#12304A] hover:bg-[#EAEFF4]'
            }`}
          >
            Explore India (Domestic)
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, tripType: 'international' })}
            className={`py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded-full border text-center transition-all cursor-pointer ${
              formData.tripType === 'international'
                ? 'bg-[#147D83] text-white border-[#147D83] shadow-sm'
                : 'bg-[#F5F7FA] text-[#556877] border-[#E4E9EE] hover:text-[#12304A] hover:bg-[#EAEFF4]'
            }`}
          >
            Global (International)
          </button>
        </div>
      </div>

      {/* Row 1: Destination & Departure */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#12304A] mb-1.5">
            Destination / Region *
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3 top-3 text-[#147D83]" />
            <input
              type="text"
              required
              placeholder="e.g. Kashmir, Kerala, Bali, Switzerland"
              value={formData.destinationPreference}
              onChange={(e) => setFormData({ ...formData, destinationPreference: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[#E4E9EE] bg-[#F5F7FA] text-[#263442] placeholder:text-[#556877]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#147D83]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#12304A] mb-1.5">
            Departure City
          </label>
          <input
            type="text"
            placeholder="e.g. Mumbai, Delhi, Bengaluru, Kolkata"
            value={formData.departureCity}
            onChange={(e) => setFormData({ ...formData, departureCity: e.target.value })}
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#E4E9EE] bg-[#F5F7FA] text-[#263442] placeholder:text-[#556877]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#147D83]"
          />
        </div>
      </div>

      {/* Row 2: Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#12304A] mb-1.5">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Priya Sharma"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#E4E9EE] bg-[#F5F7FA] text-[#263442] placeholder:text-[#556877]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#147D83]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#12304A] mb-1.5">
            Mobile Number (India +91) *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3 top-3 text-[#147D83]" />
            <input
              type="tel"
              required
              placeholder="10-digit number e.g. 9876543210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[#E4E9EE] bg-[#F5F7FA] text-[#263442] placeholder:text-[#556877]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#147D83]"
            />
          </div>
        </div>
      </div>

      {/* Row 3: Email & Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#12304A] mb-1.5">
            Email Address <span className="text-[#556877] font-normal">(Optional)</span>
          </label>
          <input
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#E4E9EE] bg-[#F5F7FA] text-[#263442] placeholder:text-[#556877]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#147D83]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#12304A] mb-1.5">
            Approximate Travel Dates
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-3 text-[#147D83]" />
            <input
              type="text"
              placeholder="e.g. Next month, Diwali, June 2026"
              value={formData.travelDateApprox}
              onChange={(e) => setFormData({ ...formData, travelDateApprox: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[#E4E9EE] bg-[#F5F7FA] text-[#263442] placeholder:text-[#556877]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#147D83]"
            />
          </div>
        </div>
      </div>

      {/* Row 4: Travellers & Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#12304A] mb-1.5">
            Adults (12+ yrs)
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={formData.adultsCount}
            onChange={(e) => setFormData({ ...formData, adultsCount: parseInt(e.target.value) || 1 })}
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#E4E9EE] bg-[#F5F7FA] text-[#263442] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#147D83]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#12304A] mb-1.5">
            Children (0-11 yrs)
          </label>
          <input
            type="number"
            min={0}
            max={20}
            value={formData.childrenCount}
            onChange={(e) => setFormData({ ...formData, childrenCount: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#E4E9EE] bg-[#F5F7FA] text-[#263442] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#147D83]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#12304A] mb-1.5">
            Approx. Budget (Total)
          </label>
          <select
            value={formData.approxBudgetINR}
            onChange={(e) => setFormData({ ...formData, approxBudgetINR: e.target.value })}
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#E4E9EE] bg-[#F5F7FA] text-[#263442] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#147D83] [&>option]:bg-white [&>option]:text-[#263442]"
          >
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#12304A] mb-1.5">
          Special Requests / Hotel Category / Dietary Needs
        </label>
        <textarea
          rows={3}
          placeholder="e.g. Looking for a 4-star resort with valley view, Jain meal options, celebrating our 10th anniversary..."
          value={formData.additionalNotes}
          onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
          className="w-full px-3 py-2.5 text-sm rounded-xl border border-[#E4E9EE] bg-[#F5F7FA] text-[#263442] placeholder:text-[#556877]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#147D83]"
        />
      </div>

      {/* Submit Button - Teal #147D83 */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#147D83] hover:bg-[#0E6368] disabled:bg-slate-400 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
        >
          {isSubmitting ? (
            <span>Securing Your Request...</span>
          ) : (
            <>
              <Send className="w-4 h-4 text-white" />
              <span>Get Custom Itinerary & Free Quote</span>
            </>
          )}
        </button>
        <p className="text-[11px] text-center text-[#556877] mt-2.5 font-light">
          🔒 Zero spam policy. We never share your contact number with unauthorized third parties.
        </p>
      </div>
    </form>
  );
}
