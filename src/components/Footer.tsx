'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Phone, Mail, MapPin, MessageCircle, ShieldCheck, Heart, Lock } from 'lucide-react';
import { agencyConfig, getWhatsAppLink, getPhoneLink } from '@/config/agency';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#12304A] text-slate-300 border-t border-[#1E3F5E] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1E3F5E]">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1A3F5E] border border-[#D8B779]/40 flex items-center justify-center text-[#D8B779] shadow-sm">
                <Compass className="w-5 h-5 text-[#D8B779]" />
              </div>
              <div>
                <span className="text-xl font-serif-luxury font-bold tracking-tight text-white block">
                  {agencyConfig.companyName}
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-[#D8B779] block">
                  Curated Travel Experiences
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm font-light">
              {agencyConfig.description}
            </p>

            <div className="p-3.5 rounded-xl bg-[#0B1E2E] border border-[#1E3F5E] text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-[#D8B779]">
                <ShieldCheck className="w-4 h-4 text-[#D8B779]" />
                <span>Verified Travel Operator</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-normal font-light">
                {agencyConfig.accreditations.trustNote}. Operating from Pitampura, New Delhi.
              </p>
            </div>
          </div>

          {/* Quick Journeys */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#D8B779] mb-4">
              Explore India
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300 font-light">
              <li>
                <Link href="/packages?destination=kashmir" className="hover:text-white transition-colors">
                  Kashmir Valley & Gulmarg
                </Link>
              </li>
              <li>
                <Link href="/packages?destination=kerala" className="hover:text-white transition-colors">
                  Kerala Backwaters & Munnar
                </Link>
              </li>
              <li>
                <Link href="/packages?destination=rajasthan" className="hover:text-white transition-colors">
                  Royal Rajasthan Forts
                </Link>
              </li>
              <li>
                <Link href="/packages?destination=ladakh" className="hover:text-white transition-colors">
                  Ladakh & Pangong Tso
                </Link>
              </li>
              <li>
                <Link href="/domestic" className="text-[#38BDF8] hover:text-[#D8B779] font-medium inline-block mt-1 transition-colors">
                  View All Domestic →
                </Link>
              </li>
            </ul>
          </div>

          {/* Global Journeys */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#D8B779] mb-4">
              Global Destinations
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300 font-light">
              <li>
                <Link href="/packages?destination=switzerland" className="hover:text-white transition-colors">
                  Swiss Alps & Jungfraujoch
                </Link>
              </li>
              <li>
                <Link href="/packages?destination=bali" className="hover:text-white transition-colors">
                  Bali Private Pool Villas
                </Link>
              </li>
              <li>
                <Link href="/packages?destination=dubai" className="hover:text-white transition-colors">
                  Dubai Skyline & Desert Safari
                </Link>
              </li>
              <li>
                <Link href="/packages?destination=vietnam" className="hover:text-white transition-colors">
                  Vietnam & Ha Long Bay
                </Link>
              </li>
              <li>
                <Link href="/international" className="text-[#38BDF8] hover:text-[#D8B779] font-medium inline-block mt-1 transition-colors">
                  View All International →
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Office & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#D8B779] mb-4">
              Contact & Desk
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li>
                <a
                  href={agencyConfig.contact.officeAddress.mapDirectionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-white group transition-colors"
                  title="Open Crystorix office location on Google Maps"
                >
                  <MapPin className="w-4 h-4 text-[#D8B779] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-300 font-light group-hover:underline">
                    {agencyConfig.contact.branchOffices?.[0]?.address || `${agencyConfig.contact.officeAddress.street}, ${agencyConfig.contact.officeAddress.locality}, ${agencyConfig.contact.officeAddress.city}, Delhi – ${agencyConfig.contact.officeAddress.pincode}, India`}
                  </span>
                </a>
              </li>
              <li>
                <a href={getPhoneLink()} className="flex items-center gap-2.5 hover:text-[#D8B779] transition-colors">
                  <Phone className="w-4 h-4 text-[#D8B779] shrink-0" />
                  <span className="font-medium text-sm text-white">{agencyConfig.contact.displayPhone}</span>
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-emerald-300 hover:text-emerald-200 transition-colors font-medium"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp: {agencyConfig.contact.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${agencyConfig.contact.email}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-slate-300">{agencyConfig.contact.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>
              © {currentYear} {agencyConfig.companyName} • Operated by {agencyConfig.legalEntityName}. All rights reserved.
            </span>
            <Link
              href="/admin"
              title="Staff Console"
              className="opacity-30 hover:opacity-100 transition-opacity text-slate-300 inline-flex items-center"
            >
              <Lock className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <span>•</span>
            <Link href="/plan-your-trip" className="hover:text-white transition-colors">
              Custom Itinerary
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact & Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
