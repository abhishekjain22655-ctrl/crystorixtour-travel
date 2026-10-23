'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, MapPin } from 'lucide-react';
import { packagesData } from '@/data/packages';
import { destinationsData } from '@/data/destinations';
import { getPublishedPackages, fetchPackagesFromMongoDB } from '@/lib/storage';
import { TravelPackage } from '@/types/travel';
import PackageCard from '@/components/PackageCard';

export default function InternationalPage() {
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

  const internationalPackages = packagesList.filter(
    (p) => p.destinationType === 'international' && p.status === 'published'
  );
  const internationalDestinations = destinationsData.filter((d) => d.type === 'international');

  const getDestTripCount = (dest: (typeof destinationsData)[0]) => {
    return internationalPackages.filter(
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
            <span>Curated Global Escapes ({internationalPackages.length})</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif-luxury font-bold text-[#12304A] mb-3 leading-tight">
            International Holiday Experiences
          </h1>
          <p className="text-sm sm:text-base text-[#556877] leading-relaxed font-light">
            Ascend to the Top of Europe on panoramic Swiss trains, relax in private pool villas in Seminyak, watch desert sunsets in Dubai, or cruise through Ha Long Bay’s limestone peaks. Complete with visa consultation and verified English-speaking local guides.
          </p>
        </div>

        {/* Destination Quick Pill Links */}
        <div className="mb-10 pb-6 border-b border-[#E4E9EE]">
          <span className="block text-xs uppercase font-bold tracking-[0.2em] text-[#556877] mb-3">
            Popular Global Destinations:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {internationalDestinations
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
            All International Packages ({internationalPackages.length})
          </p>
          <span className="text-xs text-[#556877]">
            Showing {internationalPackages.length} active itineraries
          </span>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {internationalPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* International Visa Support Callout - Deep Navy #12304A */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#12304A] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#1E3F5E]">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D8B779]">
              Seamless Visa & Documentation
            </span>
            <h3 className="text-2xl font-serif-luxury font-bold text-white">
              Stress-Free International Travel For Indian Passport Holders
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl font-light">
              We guide you through Schengen visa appointments, Dubai e-visas, Vietnam authorizations, and currency advice step-by-step.
            </p>
          </div>
          <Link
            href="/plan-your-trip"
            className="shrink-0 px-8 py-3.5 rounded-full bg-[#147D83] hover:bg-[#0E6368] text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
          >
            Consult Our Specialists
          </Link>
        </div>
      </div>
    </div>
  );
}
