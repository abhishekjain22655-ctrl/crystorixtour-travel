'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, MapPin } from 'lucide-react';
import { packagesData } from '@/data/packages';
import { destinationsData } from '@/data/destinations';
import { getPublishedPackages, fetchPackagesFromMongoDB } from '@/lib/storage';
import { TravelPackage } from '@/types/travel';
import PackageCard from '@/components/PackageCard';

export default function DomesticPage() {
  const [packagesList, setPackagesList] = useState<TravelPackage[]>(() => {
    if (typeof window !== 'undefined') {
      const pub = getPublishedPackages();
      if (pub && pub.length > 0) return pub;
    }
    return packagesData.filter((p) => p.status === 'published');
  });

  useEffect(() => {
    setPackagesList(getPublishedPackages());
    fetchPackagesFromMongoDB().then((allPkgs) => {
      if (Array.isArray(allPkgs) && allPkgs.length > 0) {
        setPackagesList(allPkgs.filter((p) => p.status === 'published'));
      }
    }).catch(() => {});

    const handleUpdate = () => setPackagesList(getPublishedPackages());
    window.addEventListener('packages_updated', handleUpdate);
    return () => window.removeEventListener('packages_updated', handleUpdate);
  }, []);

  const domesticPackages = packagesList.filter(
    (p) => p.destinationType === 'domestic' && p.status === 'published'
  );
  const domesticDestinations = destinationsData.filter((d) => d.type === 'domestic');

  const getDestTripCount = (dest: (typeof destinationsData)[0]) => {
    return domesticPackages.filter(
      (p) =>
        p.destinationName.toLowerCase().includes(dest.name.toLowerCase()) ||
        dest.name.toLowerCase().includes(p.destinationName.toLowerCase()) ||
        p.slug.toLowerCase().includes(dest.slug.toLowerCase()) ||
        p.regionOrCountry.toLowerCase().includes(dest.name.toLowerCase())
    ).length;
  };

  return (
    <div className="min-h-screen bg-white text-[#263442] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Editorial Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5F7FA] text-xs font-bold uppercase tracking-[0.2em] text-[#147D83] border border-[#E4E9EE] mb-3.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B779]" />
            <span>Incredible India Tours ({domesticPackages.length})</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif-luxury font-bold text-[#12304A] mb-3 leading-tight">
            Handcrafted Domestic Holidays
          </h1>
          <p className="text-sm sm:text-base text-[#556877] leading-relaxed font-light">
            From the pine-fringed shikaras of Dal Lake to the spice plantations of Munnar and the desert forts of Rajasthan. Every domestic itinerary includes verified 4-star stays, dedicated sanitized vehicles, and 24/7 on-trip assistance.
          </p>
        </div>

        {/* Destination Quick Pill Links */}
        <div className="mb-10 pb-6 border-b border-[#E4E9EE]">
          <span className="block text-xs uppercase font-bold tracking-[0.2em] text-[#556877] mb-3">
            Explore by Region:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {domesticDestinations
              .filter((d) => getDestTripCount(d) > 0)
              .map((d) => {
                const tripCount = getDestTripCount(d);
                return (
                  <Link
                    key={d.id}
                    href={`/packages?destination=${d.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#F5F7FA] text-[#263442] border border-[#E4E9EE] hover:border-[#147D83] hover:text-[#147D83] transition-all duration-200 shadow-2xs hover:shadow-xs"
                  >
                    <MapPin className="w-3 h-3 text-[#147D83]" />
                    <span>{d.name}</span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded-full text-[#556877]">
                      {tripCount}
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>

        {/* Section Count Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#E4E9EE]">
          <p className="text-xs font-bold uppercase tracking-wider text-[#12304A]">
            All Domestic Packages ({domesticPackages.length})
          </p>
          <span className="text-xs text-[#556877]">
            Showing {domesticPackages.length} active itineraries
          </span>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domesticPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* Custom Tailored CTA Banner - Deep Navy #12304A */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#12304A] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#1E3F5E]">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-serif-luxury font-bold text-white">
              Looking for a Customized Domestic Route?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl font-light">
              We specialize in tailor-made family holidays, senior-citizen friendly pacing, and honeymoon surprises across any Indian state.
            </p>
          </div>
          <Link
            href="/plan-your-trip"
            className="shrink-0 px-8 py-3.5 rounded-full bg-[#147D83] hover:bg-[#0E6368] text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
          >
            Request Custom Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
