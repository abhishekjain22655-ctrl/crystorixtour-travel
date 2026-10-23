'use client';

import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { agencyConfig, getWhatsAppLink, getPhoneLink } from '@/config/agency';

export default function FloatingActionButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Click to Call Button */}
      <a
        href={getPhoneLink()}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white text-[#12304A] border border-[#E4E9EE] shadow-[0_8px_25px_rgba(18,48,74,0.12)] hover:border-[#147D83] transition-all duration-200 transform hover:-translate-y-0.5 group"
        aria-label="Call our travel specialists"
      >
        <div className="w-8 h-8 rounded-full bg-[#12304A] text-[#D8B779] flex items-center justify-center group-hover:bg-[#147D83] group-hover:text-white transition-colors shadow-2xs">
          <Phone className="w-3.5 h-3.5" />
        </div>
        <div className="hidden sm:block text-left pr-1.5">
          <span className="block text-[9px] uppercase font-bold tracking-wider text-[#556877]">
            Call Concierge
          </span>
          <span className="block text-xs font-bold text-[#12304A]">
            {agencyConfig.contact.displayPhone}
          </span>
        </div>
      </a>

      {/* Floating WhatsApp Action Button with Live Pulse Dot */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-[0_8px_25px_rgba(5,150,105,0.3)] hover:shadow-[0_12px_30px_rgba(5,150,105,0.4)] transition-all duration-200 transform hover:-translate-y-1 group"
        aria-label="Chat with our destination experts on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-300 ring-2 ring-emerald-600 animate-ping" />
        </div>
        <div className="text-left">
          <span className="block text-[9px] uppercase font-bold tracking-wider text-emerald-100/90 leading-none mb-0.5">
            Online Now
          </span>
          <span className="block text-xs font-bold tracking-wide leading-none">
            Chat on WhatsApp
          </span>
        </div>
      </a>
    </div>
  );
}
