import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, MapPin, Tag, ArrowRight, MessageCircle } from 'lucide-react';
import { TravelPackage } from '@/types/travel';
import { agencyConfig } from '@/config/agency';

interface PackageCardProps {
  pkg: TravelPackage;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const whatsappUrl = `https://wa.me/${agencyConfig.contact.whatsappNumber}?text=${agencyConfig.whatsappTemplates.packageEnquiry(
    pkg.title,
    `${pkg.durationDays}D / ${pkg.durationNights}N`
  )}`;

  return (
    <div className="group bg-white rounded-2xl border border-[#E4E9EE] overflow-hidden shadow-sm hover:shadow-[0_15px_30px_-5px_rgba(18,48,74,0.12)] hover:border-[#147D83]/40 transition-all duration-500 flex flex-col justify-between">
      <div>
        {/* Card Image Container */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-100">
          <img
            src={pkg.heroImage}
            alt={pkg.title}
            className="w-full h-full object-cover card-zoom-image"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
            {pkg.badge && (
              <span className="px-3 py-1 rounded-full text-[9px] uppercase font-bold tracking-[0.2em] bg-[#12304A] text-[#D8B779] border border-[#D8B779]/30 shadow-xs">
                {pkg.badge}
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full text-[9px] uppercase font-bold tracking-wider bg-white/90 text-[#12304A] backdrop-blur-md shadow-2xs font-bold">
              {pkg.destinationType === 'domestic' ? 'India' : 'International'}
            </span>
          </div>

          {/* Duration Badge Bottom Right */}
          <div className="absolute bottom-3.5 right-3.5 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#12304A]/90 text-white backdrop-blur-md border border-white/20">
              <Clock className="w-3.5 h-3.5 text-[#D8B779]" />
              {pkg.durationDays}D / {pkg.durationNights}N
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#556877] mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#147D83]" />
            <span>{pkg.destinationName} • {pkg.regionOrCountry}</span>
          </div>

          <h3 className="text-xl font-serif-luxury font-bold text-[#12304A] leading-snug group-hover:text-[#147D83] transition-colors mb-2.5 line-clamp-2">
            {pkg.title}
          </h3>

          <p className="text-xs text-[#556877] line-clamp-2 mb-4 leading-relaxed font-light">
            {pkg.tagline}
          </p>

          {/* Categories / Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {pkg.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#F5F7FA] text-[#263442] border border-[#E4E9EE]"
              >
                <Tag className="w-2.5 h-2.5 text-[#147D83]" />
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer & Price / CTA */}
      <div className="px-6 pb-6 pt-3.5 border-t border-[#E4E9EE] flex items-center justify-between">
        <div>
          <span className="block text-[9px] uppercase font-bold tracking-widest text-[#556877]">
            Starting Price
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold font-serif-luxury text-[#12304A]">
              ₹{pkg.startingPriceINR.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-[#556877]">/ guest</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp about this package"
            className="p-2.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            aria-label="Enquire on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <Link
            href={`/packages/${pkg.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full bg-[#147D83] hover:bg-[#0E6368] text-white border border-[#147D83] transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
