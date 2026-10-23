/**
 * =========================================================================
 * 🏢 COMPANY & AGENCY CONFIGURATION (SINGLE SOURCE OF TRUTH)
 * =========================================================================
 * 
 * Official Company Details:
 * CRYSTORIX TOUR AND TRAVEL
 * Primary Market: India (Domestic & International Travel)
 * Contact Number: +91 9711875177
 * Business Email: Crystorixservicespvtltd@gmail.com
 * Address: 301, 3rd Floor, Rama Market, Rani Bagh, Pitampura, North West Delhi, Delhi – 110034, India
 * 
 * =========================================================================
 */

export interface AgencyConfig {
  companyName: string;
  legalEntityName: string;
  shortName: string;
  tagline: string;
  description: string;
  establishedYear: number;
  
  // Contact & Support
  contact: {
    primaryPhone: string;
    displayPhone: string;
    secondaryPhone?: string;
    whatsappNumber: string; // International format without '+' e.g. '919711875177'
    whatsappDisplay: string;
    email: string;
    bookingEmail: string;
    supportEmail: string;
    workingHours: string;
    officeAddress: {
      street: string;
      locality: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
      landmark?: string;
      mapEmbedUrl?: string;
    };
    branchOffices?: Array<{
      city: string;
      address: string;
      phone: string;
    }>;
  };

  // Legal, Trust & Accreditations
  accreditations: {
    gstNumberPlaceholder: string;
    cinPlaceholder?: string;
    iataMember: boolean;
    ministryOfTourismApproved: boolean;
    registeredAgencyBadgeText: string;
    trustNote: string;
  };

  // Social Links
  socials: {
    instagram: string;
    facebook: string;
    youtube?: string;
    linkedin?: string;
    twitter?: string;
  };

  // Default SEO & Metadata
  seo: {
    siteUrl: string;
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    ogImage: string;
    keywords: string[];
  };

  // Quick WhatsApp Pre-fill message templates
  whatsappTemplates: {
    generalEnquiry: (name?: string) => string;
    packageEnquiry: (packageTitle: string, duration: string) => string;
    customTripEnquiry: (destination: string, dates?: string) => string;
  };
}

export const agencyConfig: AgencyConfig = {
  companyName: "CRYSTORIX TOUR AND TRAVEL",
  legalEntityName: "CRYSTORIX TOUR AND TRAVEL",
  shortName: "Crystorix",
  tagline: "Your Journey Begins with Crystorix.",
  description:
    "CRYSTORIX TOUR AND TRAVEL helps travellers plan memorable journeys across India and international destinations. We aim to make travel planning convenient by helping customers explore destinations, discover holiday options, and organize trips according to their preferences, interests, and budget.",
  establishedYear: 2024,

  contact: {
    primaryPhone: "+919711875177",
    displayPhone: "+91 9711875177",
    secondaryPhone: "+91 9711875177",
    whatsappNumber: "919711875177", // 91 + 10 digits
    whatsappDisplay: "+91 9711875177",
    email: "Crystorixservicespvtltd@gmail.com",
    bookingEmail: "Crystorixservicespvtltd@gmail.com",
    supportEmail: "Crystorixservicespvtltd@gmail.com",
    workingHours: "Monday – Saturday: 9:30 AM to 7:00 PM IST",
    officeAddress: {
      street: "301, 3rd Floor, Rama Market, Rani Bagh",
      locality: "Pitampura, North West Delhi",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110034",
      country: "India",
      landmark: "Rama Market, Rani Bagh",
    },
    branchOffices: [
      {
        city: "New Delhi (Head Office)",
        address: "301, 3rd Floor, Rama Market, Rani Bagh, Pitampura, North West Delhi, Delhi – 110034, India",
        phone: "+91 9711875177",
      },
    ],
  },

  accreditations: {
    gstNumberPlaceholder: "Registered in New Delhi, India",
    cinPlaceholder: "Tour and Travel Agency",
    iataMember: false,
    ministryOfTourismApproved: false,
    registeredAgencyBadgeText: "Registered Tour & Travel Operator • New Delhi, India",
    trustNote: "Official verified details for CRYSTORIX TOUR AND TRAVEL",
  },

  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
    linkedin: "https://linkedin.com/",
  },

  seo: {
    siteUrl: "https://crystorix.com",
    defaultTitle: "Crystorix Tour and Travel | Domestic & International Holidays",
    titleTemplate: "%s | Crystorix Tour and Travel",
    defaultDescription:
      "Explore domestic and international holiday destinations with Crystorix Tour and Travel. Discover curated travel packages and contact our team to enquire about your next trip.",
    ogImage: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=1200&auto=format&fit=crop",
    keywords: [
      "Crystorix Tour and Travel",
      "Crystorix Travel",
      "travel agency New Delhi",
      "Pitampura travel agency",
      "domestic holiday packages",
      "international holiday packages",
      "Kashmir tour packages",
      "Kerala holiday packages",
      "Dubai tour packages",
      "customized tour operator India",
    ],
  },

  whatsappTemplates: {
    generalEnquiry: (name?: string) =>
      encodeURIComponent(
        `Hello Crystorix Tour and Travel, I would like to enquire about your travel packages. Please share the available options and details.`
      ),
    packageEnquiry: (packageTitle: string, duration: string) =>
      encodeURIComponent(
        `Hello Crystorix Tour and Travel, I am interested in booking the "${packageTitle}" (${duration}). Please share the available dates, itinerary, and best quote.`
      ),
    customTripEnquiry: (destination: string, dates?: string) =>
      encodeURIComponent(
        `Hello Crystorix Tour and Travel, I would like to plan a custom trip to ${destination}${dates ? ` around ${dates}` : ""}. Could you connect me with a consultant?`
      ),
  },
};

/**
 * Helper to generate direct WhatsApp chat links with encoded messages
 */
export function getWhatsAppLink(message?: string): string {
  const text = message || agencyConfig.whatsappTemplates.generalEnquiry();
  return `https://wa.me/${agencyConfig.contact.whatsappNumber}?text=${text}`;
}

/**
 * Helper to generate tel: call link
 */
export function getPhoneLink(): string {
  return `tel:${agencyConfig.contact.primaryPhone}`;
}
