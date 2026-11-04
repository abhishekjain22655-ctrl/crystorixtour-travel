import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ShieldCheck,
  Target,
  Eye,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Plane,
  Building2,
  Ship,
  FileCheck2,
  Users2,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';
import { agencyConfig, getPhoneLink, getWhatsAppLink } from '@/config/agency';

export const metadata = {
  title: `About Us | ${agencyConfig.companyName}`,
  description: `Learn about ${agencyConfig.companyName}, our mission, vision, services, and commitment to memorable domestic and international travel planning.`,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: `About Us | ${agencyConfig.companyName}`,
    description: `Discover Crystorix Tour and Travel — verified travel concierge based in Pitampura, New Delhi.`,
    url: '/about',
    type: 'website',
  },
};

export default function AboutPage() {
  const whyChooseUsPoints = [
    {
      title: 'Personalized Travel Planning',
      desc: 'Travel options tailored to individual preferences and requirements.',
    },
    {
      title: 'Domestic and International Travel',
      desc: 'Explore destinations across India and around the world.',
    },
    {
      title: 'Holiday Options for Everyone',
      desc: 'Travel ideas for couples, families, groups, and individual travellers.',
    },
    {
      title: 'Convenient Planning',
      desc: 'Assistance with organizing itineraries and travel requirements.',
    },
    {
      title: 'Customer-Focused Service',
      desc: 'Clear communication and attention to customer needs.',
    },
    {
      title: 'Flexible Travel Choices',
      desc: 'Explore different destinations and holiday options according to your preferences and budget.',
    },
  ];

  const services = [
    { name: 'Domestic Holiday Packages', icon: Compass },
    { name: 'International Tour Packages', icon: Plane },
    { name: 'Honeymoon Packages', icon: Sparkles },
    { name: 'Family Holiday Packages', icon: Users2 },
    { name: 'Group Tours', icon: HeartHandshake },
    { name: 'Customized Travel Planning', icon: Target },
    { name: 'Flight Booking Assistance', icon: Plane },
    { name: 'Hotel Booking Assistance', icon: Building2 },
    { name: 'Cruise Holidays', icon: Ship },
    { name: 'Visa Assistance', icon: FileCheck2 },
  ];

  const travelCategories = [
    'Adventure and Nature Escapes',
    'Luxury Holidays',
    'Beach Destinations',
    'Cultural and Heritage Tours',
    'Romantic Getaways',
    'Family-Friendly Holidays',
    'International City Experiences',
    'Cruise Experiences',
  ];

  return (
    <div className="min-h-screen bg-white text-[#263442] py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            '@id': `${agencyConfig.seo.siteUrl}/about#webpage`,
            url: `${agencyConfig.seo.siteUrl}/about`,
            name: `About ${agencyConfig.companyName}`,
            description: agencyConfig.seo.defaultDescription,
            mainEntity: {
              '@type': 'TravelAgency',
              name: agencyConfig.companyName,
              legalName: agencyConfig.legalEntityName,
              alternateName: agencyConfig.brandAliases,
              url: agencyConfig.seo.siteUrl,
            },
          }),
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Header / About Us */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#147D83] block">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif-luxury font-bold text-[#12304A] leading-tight">
            CRYSTORIX TOUR AND TRAVEL
          </h1>
          <p className="text-base sm:text-lg text-[#556877] leading-relaxed">
            CRYSTORIX TOUR AND TRAVEL helps travellers plan memorable journeys across India and international destinations. We aim to make travel planning convenient by helping customers explore destinations, discover holiday options, and organize trips according to their preferences, interests, and budget.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F5F7FA] border border-[#E4E9EE] shadow-2xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E4E9EE] text-[#147D83] flex items-center justify-center shadow-xs">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-serif-luxury font-bold text-[#12304A]">Our Mission</h2>
            </div>
            <p className="text-sm text-[#556877] leading-relaxed">
              Our mission is to make travel planning simpler, more convenient, and more enjoyable by helping customers find suitable travel experiences for holidays, family vacations, honeymoons, and international adventures.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#F5F7FA] border border-[#E4E9EE] shadow-2xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E4E9EE] text-[#147D83] flex items-center justify-center shadow-xs">
                <Eye className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-serif-luxury font-bold text-[#12304A]">Our Vision</h2>
            </div>
            <p className="text-sm text-[#556877] leading-relaxed">
              Our vision is to become a trusted choice for travellers by focusing on customer satisfaction, personalized travel planning, transparent communication, and memorable travel experiences.
            </p>
          </div>
        </div>

        {/* Travel Philosophy Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#12304A] text-white border border-[#1E3F5E] shadow-sm space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#D8B779] block">
            Our Travel Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold leading-snug">
            Turning Travel Ideas Into Well-Planned Journeys
          </h2>
          <p className="text-sm text-slate-200 leading-relaxed max-w-3xl font-light">
            We believe every journey should be an opportunity to discover new places, experience different cultures, spend quality time with loved ones, and create lasting memories. Our goal is to help customers turn their travel ideas into well-planned journeys.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#147D83] block">
              Why Choose Us?
            </span>
            <h2 className="text-3xl font-serif-luxury font-bold text-[#12304A]">
              Thoughtful & Reliable Travel Planning
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {whyChooseUsPoints.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E4E9EE] shadow-xs space-y-2 hover:border-[#147D83]/40 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#147D83] shrink-0" />
                  <h3 className="text-base font-bold text-[#12304A] font-serif-luxury">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-[#556877] leading-relaxed pl-7 font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Services */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#147D83] block">
              Comprehensive Support
            </span>
            <h2 className="text-3xl font-serif-luxury font-bold text-[#12304A]">
              Our Travel Services
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#F5F7FA] border border-[#E4E9EE] flex flex-col items-center text-center gap-2.5 hover:bg-white hover:border-[#147D83]/40 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-white text-[#147D83] flex items-center justify-center border border-[#E4E9EE] shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-[#12304A]">
                    {srv.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular Travel Categories */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#147D83] block">
              Inspiration
            </span>
            <h2 className="text-3xl font-serif-luxury font-bold text-[#12304A]">
              Popular Travel Categories
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {travelCategories.map((cat, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full text-xs font-medium bg-[#F5F7FA] border border-[#E4E9EE] text-[#12304A] hover:border-[#147D83] hover:text-[#147D83] transition-colors"
              >
                ★ {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F5F7FA] border border-[#E4E9EE] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-2xl font-serif-luxury font-bold text-[#12304A]">
              Corporate & Contact Information
            </h2>
            <span className="text-xs text-[#556877]">
              Operated by <strong className="text-[#12304A]">{agencyConfig.legalEntityName}</strong>
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E4E9EE] text-[#D8B779] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#147D83]" />
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold text-[#556877] tracking-wider">
                  Office Address
                </span>
                <p className="text-xs text-[#12304A] font-medium leading-relaxed">
                  {agencyConfig.contact.branchOffices?.[0].address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E4E9EE] text-[#D8B779] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#147D83]" />
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold text-[#556877] tracking-wider">
                  Phone Number
                </span>
                <a
                  href={getPhoneLink()}
                  className="text-xs text-[#147D83] hover:underline font-bold block"
                >
                  {agencyConfig.contact.displayPhone}
                </a>
                <span className="text-[11px] text-[#556877] block">Click to call directly</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E4E9EE] text-[#D8B779] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#147D83]" />
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold text-[#556877] tracking-wider">
                  Email Address
                </span>
                <a
                  href={`mailto:${agencyConfig.contact.email}`}
                  className="text-xs text-[#147D83] hover:underline font-bold block truncate"
                >
                  {agencyConfig.contact.email}
                </a>
                <span className="text-[11px] text-[#556877] block">Click to compose email</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#12304A] text-white space-y-6 shadow-xl border border-[#1E3F5E] text-center md:text-left">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
              “Your Journey Begins with Crystorix.”
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
              Discover exciting destinations, explore personalized holiday options, and start planning your next adventure with CRYSTORIX TOUR AND TRAVEL.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <Link
              href="/domestic"
              className="px-6 py-3 rounded-full bg-[#147D83] hover:bg-[#0E6368] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              Explore Destinations
            </Link>
            <Link
              href="/packages"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider transition-all"
            >
              Discover Holiday Packages
            </Link>
            <Link
              href="/plan-your-trip"
              className="px-6 py-3 rounded-full bg-[#D8B779] hover:bg-[#c9a665] text-[#12304A] text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
