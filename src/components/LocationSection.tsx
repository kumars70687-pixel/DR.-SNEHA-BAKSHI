import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Copy, 
  Check, 
  Clock, 
  Building2, 
  ExternalLink,
  Compass,
  AlertCircle
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CLINIC_INFO } from '../data/clinicData';

interface LocationSectionProps {
  currentLang: Language;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(CLINIC_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleCopyPlusCode = () => {
    navigator.clipboard.writeText(CLINIC_INFO.plusCode);
    setCopiedPlusCode(true);
    setTimeout(() => setCopiedPlusCode(false), 2500);
  };

  // Google Maps Embed Query URL
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    'Kalyan Pharmacy, Supertech Eco Village-2, Greater Noida West Road, Noida, Uttar Pradesh 201318'
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location" className="py-16 sm:py-20 bg-white border-b border-[#E3EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#E8F6F3] text-[#168C8C] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-[#168C8C]/20 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#168C8C]" />
            <span>{t.location.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#173B63] tracking-tight">
            {t.location.heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            {t.location.subheading}
          </p>
        </div>

        {/* Content Grid: Left Card Details / Right Interactive Map Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Responsive Location Details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#F7FAFC] p-6 sm:p-8 rounded-3xl border border-[#E3EAF0] shadow-sm">
            
            <div className="space-y-6">
              {/* Clinic Address Card */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                    <MapPin className="w-4 h-4 text-[#168C8C]" />
                    <span>{t.location.addressTitle}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#168C8C] hover:text-[#173B63] transition-colors"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">{t.location.addressCopied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.location.copyAddress}</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-[#E3EAF0] text-sm text-gray-800 leading-relaxed font-medium">
                  {currentLang === 'hi' ? CLINIC_INFO.addressHi : CLINIC_INFO.address}
                </div>
              </div>

              {/* Plus Code & Timings Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Plus Code */}
                <div className="p-4 bg-white rounded-2xl border border-[#E3EAF0] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500 font-semibold uppercase">{t.location.plusCodeTitle}</span>
                      <button
                        type="button"
                        onClick={handleCopyPlusCode}
                        className="text-gray-400 hover:text-[#168C8C]"
                        title={t.location.copyPlusCode}
                      >
                        {copiedPlusCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="font-mono font-bold text-sm text-[#173B63]">{CLINIC_INFO.plusCode}</p>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-2">
                    {copiedPlusCode ? t.location.plusCodeCopied : 'Searchable in Google Maps'}
                  </p>
                </div>

                {/* Closing Time */}
                <div className="p-4 bg-white rounded-2xl border border-[#E3EAF0] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold uppercase mb-1">
                      <Clock className="w-3.5 h-3.5 text-[#168C8C]" />
                      <span>{t.location.hoursTitle}</span>
                    </div>
                    <p className="font-bold text-sm text-[#173B63]">
                      {currentLang === 'hi' ? 'रात 8:30 बजे तक' : 'Closes at 8:30 PM'}
                    </p>
                  </div>
                  <p className="text-[11px] text-emerald-600 font-medium mt-2">
                    {currentLang === 'hi' ? 'सोमवार से शनिवार' : 'Mon - Sat Consultation'}
                  </p>
                </div>

              </div>

              {/* Direct Phone */}
              <div className="p-4 bg-white rounded-2xl border border-[#E3EAF0] flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-semibold uppercase block">{t.location.phoneTitle}</span>
                  <a
                    href={`tel:${CLINIC_INFO.phoneTel}`}
                    className="font-bold text-base text-[#173B63] hover:text-[#168C8C] transition-colors"
                  >
                    {CLINIC_INFO.phoneDisplay}
                  </a>
                </div>
                <a
                  href={`tel:${CLINIC_INFO.phoneTel}`}
                  className="p-2.5 bg-[#E8F6F3] text-[#168C8C] rounded-xl hover:bg-[#168C8C] hover:text-white transition-colors"
                  aria-label="Call clinic phone"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              {/* Hospital Affiliation Distinction Note */}
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-sky-900 leading-relaxed flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-sky-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block mb-0.5">{t.location.hospitalDistinctionTitle}</span>
                  <span>{t.location.hospitalDistinctionDesc}</span>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
              <a
                href={CLINIC_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#173B63] hover:bg-[#122e4d] text-white py-3.5 px-4 rounded-xl font-semibold text-sm transition-all shadow-sm"
              >
                <Navigation className="w-4 h-4 text-[#168C8C]" />
                <span>{t.location.directionsBtn}</span>
              </a>

              <a
                href={`tel:${CLINIC_INFO.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 bg-white border border-[#168C8C] text-[#173B63] py-3.5 px-5 rounded-xl font-semibold text-sm hover:bg-[#E8F6F3] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#168C8C]" />
                <span>{t.location.callBtn}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Embedded Map with Fallback */}
          <div className="lg:col-span-7 flex flex-col rounded-3xl overflow-hidden border border-[#E3EAF0] shadow-sm bg-white min-h-[420px] relative">
            <div className="bg-[#173B63] text-white px-4 py-2.5 flex items-center justify-between text-xs font-medium">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal-300" />
                <span>Supertech Eco Village-2, Greater Noida West</span>
              </div>
              <a
                href={CLINIC_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-300 hover:text-white inline-flex items-center gap-1 underline underline-offset-2"
              >
                <span>Full Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Google Map Iframe with fallback */}
            <div className="w-full flex-1 relative bg-slate-100">
              <iframe
                title="Dr. Sneha Bakshi Clinic Location at Kalyan Pharmacy, Supertech Eco Village-2, Noida"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Quick Navigation Footer */}
            <div className="p-3 bg-white border-t border-[#E3EAF0] flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
              <span>Landmark: Near Kalyan Pharmacy, Supertech Eco Village-2 Main Area</span>
              <a
                href={CLINIC_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#168C8C] hover:underline"
              >
                Open in Google Maps App &rarr;
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
