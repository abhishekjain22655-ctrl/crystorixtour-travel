import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck, HelpCircle, Navigation } from 'lucide-react';
import { agencyConfig, getPhoneLink, getWhatsAppLink } from '@/config/agency';
import { faqData } from '@/data/faq';
import EnquiryForm from '@/components/EnquiryForm';

export const metadata = {
  title: `Contact Us & Head Office | ${agencyConfig.companyName}`,
  description: `Get in touch with ${agencyConfig.companyName}. Office address in Pitampura, New Delhi. Official phone: ${agencyConfig.contact.displayPhone}, Email: ${agencyConfig.contact.email}.`,
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: `Contact Us & Head Office | ${agencyConfig.companyName}`,
    description: `Visit our Pitampura, New Delhi office or speak with our travel concierge. Call ${agencyConfig.contact.displayPhone}.`,
    url: '/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TravelAgency'],
    '@id': `${agencyConfig.seo.siteUrl}/contact#office`,
    name: agencyConfig.companyName,
    legalName: agencyConfig.legalEntityName,
    url: `${agencyConfig.seo.siteUrl}/contact`,
    telephone: agencyConfig.contact.primaryPhone,
    email: agencyConfig.contact.email,
    image: agencyConfig.seo.ogImage,
    hasMap: agencyConfig.contact.officeAddress.mapDirectionUrl,
    priceRange: '₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer, UPI',
    address: {
      '@type': 'PostalAddress',
      streetAddress: agencyConfig.contact.officeAddress.street,
      addressLocality: agencyConfig.contact.officeAddress.city,
      addressRegion: agencyConfig.contact.officeAddress.state,
      postalCode: agencyConfig.contact.officeAddress.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6989,
      longitude: 77.1384,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:30',
        closes: '19:00',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-[#263442] py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#147D83] block">
            We Are Here For You
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif-luxury font-bold text-[#12304A]">
            Contact Our Travel Concierge
          </h1>
          <p className="text-sm sm:text-base text-[#556877]">
            Have an itinerary question, looking to book a customized holiday, or need travel support? Reach us through any of our official channels.
          </p>
        </div>

        {/* 3 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Phone */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4E9EE] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F5F7FA] text-[#147D83] flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#12304A] font-serif-luxury">
              Direct Telephone
            </h3>
            <p className="text-xs text-[#556877]">
              Speak directly with an available destination specialist.
            </p>
            <div className="pt-2">
              <a
                href={getPhoneLink()}
                className="text-sm font-bold text-[#147D83] hover:text-[#0E6368] transition-colors block"
              >
                {agencyConfig.contact.displayPhone}
              </a>
              <span className="text-xs text-[#556877] block mt-0.5">
                Official Support Line
              </span>
            </div>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4E9EE] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#12304A] font-serif-luxury">
              Official WhatsApp
            </h3>
            <p className="text-xs text-[#556877]">
              Fastest way to get day-wise itineraries, quotes, and quick answers.
            </p>
            <div className="pt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                <span>{agencyConfig.contact.whatsappDisplay}</span>
                <span>→</span>
              </a>
              <span className="text-xs text-[#556877] block mt-0.5">
                Quick responses during business hours
              </span>
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4E9EE] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F5F7FA] text-[#147D83] flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#12304A] font-serif-luxury">
              Official Email
            </h3>
            <p className="text-xs text-[#556877]">
              Send itinerary enquiries, corporate travel requests, or questions.
            </p>
            <div className="pt-2 space-y-0.5">
              <a
                href={`mailto:${agencyConfig.contact.email}`}
                className="text-xs font-semibold text-[#147D83] hover:text-[#0E6368] transition-colors block break-all"
              >
                {agencyConfig.contact.email}
              </a>
              <span className="text-[11px] text-[#556877] block">
                Response within 24 business hours
              </span>
            </div>
          </div>
        </div>

        {/* Office Location & Hours */}
        <div className="bg-white p-8 rounded-2xl border border-[#E4E9EE] shadow-sm space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#147D83] block mb-1">
              Registered Office
            </span>
            <h2 className="text-2xl font-serif-luxury font-bold text-[#12304A]">
              Office Address & Operating Timings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Headquarters */}
            <div className="space-y-4 p-6 rounded-xl bg-[#F5F7FA] border border-[#E4E9EE]">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#12304A]">
                <MapPin className="w-4 h-4 text-[#D8B779]" />
                <span>Head Office — Exact Physical Address</span>
              </div>
              <div className="space-y-2 text-xs text-[#263442]">
                <p className="font-bold text-[#12304A] text-sm">
                  {agencyConfig.companyName}
                </p>
                <div className="p-3.5 bg-white rounded-xl border border-[#E4E9EE] shadow-2xs space-y-1">
                  <p className="font-bold text-[#147D83] text-sm flex items-center gap-1.5">
                    <span>📍</span>
                    <span>301, 3rd Floor</span>
                  </p>
                  <p className="font-semibold text-[#12304A]">
                    Rama Market, Rani Bagh, Pitampura
                  </p>
                  <p className="text-[#556877]">
                    North West Delhi, Delhi – 110034, India
                  </p>
                  <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="font-medium text-[#147D83]">
                      Landmark: Rama Market, Rani Bagh
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-1 flex flex-wrap items-center gap-4 text-xs">
                <span>
                  Contact: <a href={getPhoneLink()} className="font-semibold text-[#147D83] hover:underline">{agencyConfig.contact.displayPhone}</a>
                </span>
                <a
                  href={agencyConfig.contact.officeAddress.mapDirectionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#147D83] hover:underline inline-flex items-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#D8B779]" />
                  <span>Get Directions →</span>
                </a>
              </div>
            </div>

            {/* Hours & Visiting Info */}
            <div className="space-y-3 p-5 rounded-xl bg-[#F5F7FA] border border-[#E4E9EE]">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#12304A]">
                <Clock className="w-4 h-4 text-[#D8B779]" />
                <span>Working Hours & Appointments</span>
              </div>
              <p className="text-xs text-[#263442] leading-relaxed">
                <strong>Business Hours:</strong> Monday – Saturday: 9:30 AM to 7:00 PM IST
              </p>
              <p className="text-xs text-[#556877]">
                Sunday: Closed for office visits. Dedicated emergency support remains active for on-tour travellers.
              </p>
              <p className="text-xs text-[#556877] pt-1">
                For in-person trip planning consultations at our Pitampura office, prior scheduling via phone or WhatsApp is recommended.
              </p>
            </div>
          </div>

          {/* Interactive Google Map Embed & Navigation */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#147D83]/10 text-[#147D83] text-[11px] font-bold uppercase tracking-wider mb-1">
                  <MapPin className="w-3 h-3" /> Exact Pinned Location
                </div>
                <h3 className="text-lg font-bold text-[#12304A] font-serif-luxury">
                  Google Maps Office Navigation
                </h3>
                <p className="text-xs text-[#263442] mt-0.5">
                  <strong>Exact Address:</strong> 301, 3rd Floor, Rama Market, Rani Bagh, Pitampura, North West Delhi, Delhi – 110034, India
                </p>
              </div>
              <a
                href={agencyConfig.contact.officeAddress.mapDirectionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#147D83] hover:bg-[#0E6368] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow transition-all group shrink-0"
              >
                <Navigation className="w-4 h-4 group-hover:scale-110 transition-transform text-[#D8B779]" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>

            {/* Map Container with Floating Verified Address Card */}
            <div className="relative w-full h-[420px] sm:h-[480px] rounded-2xl overflow-hidden border border-[#E4E9EE] shadow-sm bg-[#F5F7FA]">
              {/* Floating Address Overlay Card */}
              <div className="absolute top-4 left-4 z-10 max-w-[280px] sm:max-w-xs bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#E4E9EE] shadow-lg text-xs space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="uppercase tracking-wider font-bold text-[10px] text-[#147D83]">Official Office Location</span>
                </div>
                <div className="font-bold text-[#12304A] text-xs font-serif-luxury">
                  {agencyConfig.companyName}
                </div>
                <div className="text-[#263442] text-[11px] leading-relaxed border-y border-slate-100 py-1.5 my-1 space-y-0.5">
                  <p className="font-bold text-[#147D83]">Suite 301, 3rd Floor</p>
                  <p className="font-semibold text-[#12304A]">Rama Market, Rani Bagh</p>
                  <p className="text-[#556877]">Pitampura, North West Delhi – 110034</p>
                </div>
                <a
                  href={agencyConfig.contact.officeAddress.mapDirectionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#147D83] hover:text-[#0E6368] hover:underline pt-0.5"
                >
                  <Navigation className="w-3 h-3 text-[#D8B779]" />
                  <span>Start Navigation →</span>
                </a>
              </div>

              <iframe
                title={`${agencyConfig.companyName} Head Office Exact Location`}
                src={agencyConfig.contact.officeAddress.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#E4E9EE] flex items-center gap-2 text-xs text-[#556877]">
            <Clock className="w-4 h-4 text-[#147D83]" />
            <span>Operating Hours: <strong className="text-[#12304A]">{agencyConfig.contact.workingHours}</strong></span>
          </div>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#147D83] block">
              Send an Enquiry
            </span>
            <h2 className="text-2xl font-serif-luxury font-bold text-[#12304A]">
              Tell Us About Your Dream Destination
            </h2>
            <p className="text-xs text-[#556877] leading-relaxed">
              Fill out the enquiry form and our destination specialist will review your request and get back with a customized plan.
            </p>
            <div className="p-4 rounded-xl bg-[#F5F7FA] border border-[#E4E9EE] text-xs text-[#556877] space-y-1">
              <p className="font-semibold text-[#12304A]">Prefer quick messaging?</p>
              <p>You can chat directly with our destination desk anytime on WhatsApp.</p>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#147D83] font-bold hover:underline inline-block mt-1"
              >
                Launch WhatsApp Chat →
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <EnquiryForm />
          </div>
        </div>

        {/* FAQs Accordion / List */}
        <div className="space-y-6 pt-10 border-t border-[#E4E9EE]">
          <div className="text-center max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#147D83] mb-1">
              <HelpCircle className="w-4 h-4 text-[#D8B779]" />
              <span>Common Queries</span>
            </div>
            <h2 className="text-3xl font-serif-luxury font-bold text-[#12304A]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqData.map((faq) => (
              <div
                key={faq.id}
                className="p-6 rounded-2xl bg-[#F5F7FA] border border-[#E4E9EE] shadow-2xs space-y-2"
              >
                <h4 className="text-sm font-bold text-[#12304A] font-serif-luxury">
                  {faq.question}
                </h4>
                <p className="text-xs text-[#556877] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
