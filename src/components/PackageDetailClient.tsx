'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock,
  MapPin,
  Calendar,
  ShieldCheck,
  Check,
  X,
  Phone,
  MessageCircle,
  Sparkles,
  Hotel,
  Navigation,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { TravelPackage } from '@/types/travel';
import { agencyConfig, getPhoneLink } from '@/config/agency';
import { getPackageBySlug, getPublishedPackages, fetchPackagesFromMongoDB } from '@/lib/storage';
import PackageCard from '@/components/PackageCard';
import EnquiryForm from '@/components/EnquiryForm';

interface PackageDetailClientProps {
  slug: string;
  initialPackage?: TravelPackage;
}

export default function PackageDetailClient({
  slug,
  initialPackage,
}: PackageDetailClientProps) {
  const [pkg, setPkg] = useState<TravelPackage | undefined>(initialPackage);
  const [activeImage, setActiveImage] = useState<string>(initialPackage?.heroImage || '');
  const [relatedPackages, setRelatedPackages] = useState<TravelPackage[]>([]);

  useEffect(() => {
    const evaluate = () => {
      const stored = getPackageBySlug(slug);
      const candidate = stored || initialPackage;
      if (candidate && candidate.status && candidate.status !== 'published') {
        // Draft package is hidden from the public website
        setPkg(undefined);
      } else if (candidate) {
        setPkg(candidate);
        if (!activeImage) setActiveImage(candidate.heroImage);
      } else {
        setPkg(undefined);
      }

      const allPub = getPublishedPackages();
      const related = allPub
        .filter((p) => p.slug !== slug && (stored ? p.destinationType === stored.destinationType : true))
        .slice(0, 3);
      setRelatedPackages(related);
    };

    evaluate();

    fetchPackagesFromMongoDB().then(() => {
      evaluate();
    }).catch(() => {});
  }, [slug, initialPackage]);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl border border-[#E4E9EE] shadow-sm space-y-4">
          <div className="w-12 h-12 bg-[#F5F7FA] text-[#147D83] rounded-xl flex items-center justify-center mx-auto border border-[#E4E9EE]">
            <MapPin className="w-6 h-6 text-[#D8B779]" />
          </div>
          <h2 className="text-2xl font-serif-luxury font-bold text-[#12304A]">
            Package Not Found
          </h2>
          <p className="text-xs text-[#556877]">
            This itinerary may have been unpublished or removed by the agency administrator.
          </p>
          <div className="pt-2">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#147D83] text-white text-xs font-semibold hover:bg-[#0E6368] transition-colors"
            >
              <span>Explore Available Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/${agencyConfig.contact.whatsappNumber}?text=${agencyConfig.whatsappTemplates.packageEnquiry(
    pkg.title,
    `${pkg.durationDays}D / ${pkg.durationNights}N`
  )}`;

  return (
    <div className="min-h-screen bg-white pb-24 text-[#263442]">
      {/* Breadcrumb Bar */}
      <div className="bg-[#F5F7FA] border-b border-[#E4E9EE] py-3 px-4 sm:px-8 text-xs text-[#556877]">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-[#147D83] transition-colors">Home</Link>
          <span>/</span>
          <Link
            href={pkg.destinationType === 'domestic' ? '/domestic' : '/international'}
            className="hover:text-[#147D83] transition-colors"
          >
            {pkg.destinationType === 'domestic' ? 'Domestic Holidays' : 'International Holidays'}
          </Link>
          <span>/</span>
          <span className="text-[#12304A] font-semibold truncate max-w-xs sm:max-w-md">
            {pkg.title}
          </span>
        </div>
      </div>

      {/* Hero Header & Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="space-y-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {pkg.badge && (
              <span className="px-3 py-1 rounded-full text-xs uppercase font-bold tracking-wider bg-[#D8B779] text-[#12304A] border border-[#D8B779]">
                {pkg.badge}
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#147D83]/10 text-[#147D83] border border-[#147D83]/20">
              {pkg.destinationType === 'domestic' ? 'India' : 'International'}
            </span>
            <span className="text-xs text-[#556877] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#D8B779]" />
              {pkg.destinationName} • {pkg.regionOrCountry}
            </span>
            {pkg.status === 'draft' && (
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
                Staff Preview (Draft)
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#12304A] leading-tight">
            {pkg.title}
          </h1>

          <p className="text-base sm:text-lg text-[#556877] max-w-4xl leading-relaxed">
            {pkg.tagline}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#F5F7FA] border border-[#E4E9EE] shadow-2xs">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#D8B779]" />
              <div>
                <span className="block text-[10px] uppercase font-semibold text-[#556877]">Duration</span>
                <span className="text-xs font-bold text-[#12304A]">{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Hotel className="w-5 h-5 text-[#D8B779]" />
              <div>
                <span className="block text-[10px] uppercase font-semibold text-[#556877]">Stay Tier</span>
                <span className="text-xs font-bold text-[#12304A]">{pkg.hotelCategory ? pkg.hotelCategory.split('+')[0] : 'Handpicked Boutique Hotels'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#D8B779]" />
              <div>
                <span className="block text-[10px] uppercase font-semibold text-[#556877]">Best Season</span>
                <span className="text-xs font-bold text-[#12304A] truncate max-w-[140px]">{pkg.bestTimeToVisit ? pkg.bestTimeToVisit.split('(')[0] : 'All Season'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#D8B779]" />
              <div>
                <span className="block text-[10px] uppercase font-semibold text-[#556877]">Starting From</span>
                <span className="text-xs font-bold text-[#147D83]">₹{pkg.startingPriceINR.toLocaleString('en-IN')} / guest</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid & Multi-Image Filmstrip */}
        <div className="space-y-3 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl overflow-hidden border border-[#E4E9EE]">
            <div className="md:col-span-2 h-[350px] sm:h-[460px] relative overflow-hidden bg-[#F5F7FA]">
              <img
                src={activeImage || pkg.heroImage}
                alt={pkg.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
            <div className="grid grid-rows-2 gap-4 h-[350px] sm:h-[460px]">
              {(pkg.galleryImages && pkg.galleryImages.length > 1
                ? pkg.galleryImages.slice(1, 3)
                : [pkg.heroImage, pkg.heroImage]
              ).map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className="relative h-full overflow-hidden bg-[#F5F7FA] cursor-pointer group"
                >
                  <img
                    src={imgUrl}
                    alt={`${pkg.title} view ${idx + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Multi-Image Strip (if package has more than 2 photos) */}
          {pkg.galleryImages && pkg.galleryImages.length > 2 && (
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
              {pkg.galleryImages.map((imgUrl, idx) => {
                const isSelected = (activeImage || pkg.heroImage) === imgUrl;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#147D83] ring-2 ring-[#147D83]/30'
                        : 'border-[#E4E9EE] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 2-Column Main Section: Content (Left) + Sticky Booking Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (8 cols): Itinerary, Inclusions, Terms */}
          <div className="lg:col-span-8 space-y-12">
            {/* 1. Overview */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E4E9EE] shadow-sm space-y-4">
              <h2 className="text-2xl font-serif-luxury font-bold text-[#12304A]">
                Journey Overview
              </h2>
              <p className="text-sm text-[#556877] leading-relaxed">
                {pkg.overview}
              </p>

              {/* Route breakdown */}
              {pkg.route && (
                <div className="p-4 rounded-xl bg-[#F5F7FA] border border-[#E4E9EE] space-y-1">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#147D83] flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-[#D8B779]" />
                    Planned Route
                  </span>
                  <p className="text-xs font-semibold text-[#12304A]">{pkg.route}</p>
                </div>
              )}
            </section>

            {/* 2. Day-by-Day Itinerary */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E4E9EE] shadow-sm space-y-6">
                <div className="border-b border-[#E4E9EE] pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#147D83] block mb-1">
                    Day-by-Day Journey
                  </span>
                  <h2 className="text-2xl font-serif-luxury font-bold text-[#12304A]">
                    Detailed Schedule & Daily Highlights
                  </h2>
                </div>

                <div className="space-y-6">
                  {pkg.itinerary.map((dayItem) => (
                    <div
                      key={dayItem.day}
                      className="relative pl-7 pb-6 border-l-2 border-[#E4E9EE] last:border-l-0 last:pb-0"
                    >
                      <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#12304A] text-white flex items-center justify-center text-xs font-bold shadow-sm border border-[#D8B779]/40">
                        D{dayItem.day}
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-base font-bold font-serif-luxury text-[#12304A]">
                          {dayItem.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#556877] leading-relaxed">
                          {dayItem.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                          {dayItem.mealsIncluded && dayItem.mealsIncluded.length > 0 && (
                            <span className="px-2.5 py-1 rounded-md bg-[#F5F7FA] text-[#12304A] border border-[#E4E9EE] font-medium text-[11px]">
                              🍽️ Meals: {dayItem.mealsIncluded.join(', ')}
                            </span>
                          )}
                          {dayItem.stay && (
                            <span className="px-2.5 py-1 rounded-md bg-[#F5F7FA] text-[#12304A] border border-[#E4E9EE] font-medium text-[11px]">
                              🏨 Stay: {dayItem.stay}
                            </span>
                          )}
                        </div>

                        {dayItem.highlights && dayItem.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {dayItem.highlights.map((h, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#F5F7FA] text-[#12304A] border border-[#D8B779]/30"
                              >
                                ★ {h}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. Inclusions & Exclusions */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E4E9EE] shadow-sm">
              <h2 className="text-2xl font-serif-luxury font-bold text-[#12304A] mb-6">
                Package Inclusions & Exclusions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inclusions */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#147D83] pb-2 border-b border-[#147D83]/20">
                    <Check className="w-4 h-4 text-[#147D83]" />
                    <span>What is Included</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-[#263442]">
                    {pkg.inclusions && pkg.inclusions.length > 0 ? (
                      pkg.inclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-3.5 h-3.5 text-[#147D83] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))
                    ) : (
                      <li>Verified accommodation, transfers, and daily breakfasts included.</li>
                    )}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800 pb-2 border-b border-rose-100">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>What is Not Included</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-[#263442]">
                    {pkg.exclusions && pkg.exclusions.length > 0 ? (
                      pkg.exclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))
                    ) : (
                      <li>Airfares and personal expenses.</li>
                    )}
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Cancellation & Booking Policy */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E4E9EE] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#12304A]">
                <FileText className="w-4 h-4 text-[#D8B779]" />
                <span>Transparent Cancellation & Payment Terms</span>
              </div>
              <ul className="space-y-2 text-xs text-[#556877]">
                {pkg.cancellationPolicy && pkg.cancellationPolicy.length > 0 ? (
                  pkg.cancellationPolicy.map((term, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#D8B779] font-bold">•</span>
                      <span>{term}</span>
                    </li>
                  ))
                ) : (
                  <li>Standard 30-day cancellation terms apply.</li>
                )}
              </ul>
            </section>
          </div>

          {/* Right Column (4 cols): Sticky Quote & WhatsApp CTA + Direct Enquiry Box */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            <div className="bg-white p-6 rounded-2xl border border-[#E4E9EE] shadow-md space-y-5">
              <div>
                <span className="block text-[11px] uppercase font-semibold tracking-wider text-[#556877]">
                  Starting Package Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-serif-luxury text-[#12304A]">
                    ₹{pkg.startingPriceINR.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#556877]">/ guest</span>
                </div>
                {pkg.originalPriceINR && (
                  <p className="text-xs text-[#556877] line-through mt-0.5">
                    Regular: ₹{pkg.originalPriceINR.toLocaleString('en-IN')}
                  </p>
                )}
                <p className="text-[11px] text-[#556877] mt-1">
                  * Price based on twin-sharing accommodation. Flights available as optional add-on.
                </p>
              </div>

              {/* Instant CTAs */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#147D83] hover:bg-[#0E6368] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <a
                  href={getPhoneLink()}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#F5F7FA] hover:bg-white text-[#12304A] border border-[#E4E9EE] font-semibold text-xs tracking-wider uppercase transition-all"
                >
                  <Phone className="w-4 h-4 text-[#D8B779]" />
                  <span>Call {agencyConfig.contact.displayPhone}</span>
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F5F7FA] border border-[#E4E9EE] text-[11px] text-[#556877] space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-[#12304A]">
                  <ShieldCheck className="w-4 h-4 text-[#D8B779]" />
                  <span>Booking with Confidence</span>
                </div>
                <p className="leading-relaxed">
                  ✓ Free date change flexibility on request.<br />
                  ✓ Verified 4-star properties.<br />
                  ✓ Dedicated WhatsApp concierge manager.
                </p>
              </div>
            </div>

            {/* In-Page Quick Custom Enquiry */}
            <div className="bg-white p-6 rounded-2xl border border-[#E4E9EE] shadow-sm">
              <h3 className="text-base font-bold font-serif-luxury text-[#12304A] mb-1">
                Customize This Itinerary
              </h3>
              <p className="text-xs text-[#556877] mb-4">
                Want extra nights, hotel upgrades, or private flights?
              </p>
              <EnquiryForm
                originPackageSlug={pkg.slug}
                originPackageTitle={pkg.title}
                defaultDestination={pkg.destinationName}
                defaultTripType={pkg.destinationType}
              />
            </div>
          </div>
        </div>

        {/* Related Packages Carousel / Grid */}
        {relatedPackages.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E4E9EE]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#147D83] block mb-1">
                  More Inspiring Holidays
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#12304A]">
                  Similar {pkg.destinationType === 'domestic' ? 'Indian' : 'International'} Journeys
                </h3>
              </div>

              <Link
                href={pkg.destinationType === 'domestic' ? '/domestic' : '/international'}
                className="text-xs font-bold uppercase tracking-wider text-[#147D83] hover:text-[#0E6368] flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPackages.map((rel) => (
                <PackageCard key={rel.id} pkg={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
