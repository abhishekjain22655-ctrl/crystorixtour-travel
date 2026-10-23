'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, Menu, X, Compass, ChevronDown, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { agencyConfig, getWhatsAppLink, getPhoneLink } from '@/config/agency';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Domestic Holidays', href: '/domestic' },
    { name: 'International Tours', href: '/international' },
    { name: 'All Packages', href: '/packages' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top micro-bar for trust, hours, & direct call */}
      <div className="bg-[#0B1E2E] text-slate-300 text-[11px] py-2 px-4 sm:px-8 border-b border-[#1E3F5E]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#12304A] text-[#D8B779] text-[11px] font-medium tracking-wide border border-[#D8B779]/40 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D8B779]" />
              <span>{agencyConfig.accreditations.registeredAgencyBadgeText}</span>
            </span>
            <span className="hidden lg:inline text-white/20">•</span>
            <span className="hidden lg:inline text-slate-300">
              {agencyConfig.contact.workingHours}
            </span>
          </div>

          <div className="flex items-center gap-3.5 text-xs">
            <a
              href={getPhoneLink()}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full hover:text-[#D8B779] text-slate-200 transition-colors"
            >
              <Phone className="w-3 h-3 text-[#D8B779]" />
              <span className="font-medium tracking-wide text-[11px]">{agencyConfig.contact.displayPhone}</span>
            </a>

            <span className="text-white/20">|</span>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-all font-semibold text-[11px] border border-emerald-400/40"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Deep Navy #12304A */}
      <div
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#12304A]/98 backdrop-blur-md shadow-md shadow-[#12304A]/25 py-3.5 border-b border-[#1E3F5E]'
            : 'bg-[#12304A] py-4 border-b border-[#1E3F5E]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4 xl:gap-8">
          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center gap-3.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#1A3F5E] border border-[#D8B779]/50 flex items-center justify-center text-[#D8B779] shadow-sm group-hover:border-[#D8B779] transition-all duration-300 shrink-0">
              <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500 text-[#D8B779]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-serif-luxury font-bold tracking-tight text-white block leading-tight whitespace-nowrap">
                Crystorix
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-[#D8B779] block whitespace-nowrap">
                Tour and Travel
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-7 whitespace-nowrap">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs xl:text-sm font-medium transition-colors relative py-1.5 uppercase tracking-wider text-[11px] xl:text-xs ${
                  isActive(link.href)
                    ? 'text-white font-bold'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D8B779] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Action CTAs - Teal #147D83 */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-[#147D83] hover:bg-[#0E6368] border border-[#147D83] rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 group whitespace-nowrap cursor-pointer"
            >
              <span>Plan Custom Trip</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-white" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-200 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8B779]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[98px] bottom-0 bg-[#12304A] z-50 px-6 py-6 border-t border-[#1E3F5E] overflow-y-auto flex flex-col justify-between">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest font-semibold text-[#D8B779] mb-2">
              Explore Journeys
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-lg font-serif-luxury py-2 border-b border-[#1E3F5E] ${
                  isActive(link.href)
                    ? 'text-[#D8B779] font-bold'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 space-y-3">
              <Link
                href="/plan-your-trip"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block px-5 py-3 text-xs font-bold uppercase tracking-widest text-white bg-[#147D83] hover:bg-[#0E6368] rounded-full shadow-sm"
              >
                Plan Custom Trip
              </Link>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center block px-5 py-3 text-xs font-bold uppercase tracking-widest text-emerald-950 bg-emerald-300 hover:bg-emerald-200 rounded-full"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#1E3F5E] text-xs text-slate-300 space-y-1">
            <p className="font-medium text-white">{agencyConfig.companyName}</p>
            <p>Direct Call: {agencyConfig.contact.displayPhone}</p>
            <p>{agencyConfig.contact.officeAddress.city}, {agencyConfig.contact.officeAddress.country}</p>
          </div>
        </div>
      )}
    </header>
  );
}
