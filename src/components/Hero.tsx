import React from 'react';
import { 
  Calendar, 
  Phone, 
  Navigation, 
  Star, 
  ShieldCheck, 
  Clock, 
  Building2, 
  MapPin, 
  Award,
  Stethoscope,
  Heart,
  UserCheck
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CLINIC_INFO } from '../data/clinicData';

interface HeroProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenBooking }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F7FAFC] via-white to-[#F7FAFC] border-b border-[#E3EAF0]">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="medical-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M0 16h32M16 0v32" fill="none" stroke="#173B63" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Overline, Headline, Bio, Primary Actions, Social Proof */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            
            {/* Overline Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-[#E8F6F3] text-[#168C8C] text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-[#168C8C]/25">
                <Stethoscope className="w-4 h-4 text-[#168C8C]" />
                {t.hero.overline}
              </span>
              <span className="inline-flex items-center gap-1 bg-[#173B63]/5 text-[#173B63] text-xs font-semibold px-3 py-1 rounded-full border border-[#173B63]/10">
                <Building2 className="w-3.5 h-3.5 text-[#168C8C]" />
                {t.hero.consultantBadge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-bold text-[#173B63] leading-[1.18] tracking-tight">
              {t.hero.headline}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl">
              {t.hero.supporting}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              {/* Action 1: Book an Appointment */}
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 bg-[#173B63] hover:bg-[#122e4d] text-white text-base font-semibold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] group"
              >
                <Calendar className="w-5 h-5 text-[#168C8C] group-hover:scale-110 transition-transform" />
                <span>{t.hero.bookBtn}</span>
              </button>

              {/* Action 2: Call the Clinic */}
              <a
                href={`tel:${CLINIC_INFO.phoneTel}`}
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-[#F7FAFC] text-[#173B63] border-2 border-[#168C8C] text-base font-semibold px-6 py-3.5 rounded-xl shadow-xs hover:shadow transition-all active:scale-[0.98]"
              >
                <Phone className="w-5 h-5 text-[#168C8C]" />
                <span>{t.hero.callBtn}</span>
              </a>

              {/* Secondary link: Get Directions */}
              <a
                href={CLINIC_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-[#168C8C] py-2 px-2 transition-colors group"
              >
                <Navigation className="w-4 h-4 text-[#168C8C] group-hover:rotate-45 transition-transform" />
                <span>{t.hero.directionsBtn}</span>
              </a>
            </div>

            {/* Provided Google Rating & Review badge (with clear user-provided listing notation) */}
            <div className="pt-4 border-t border-[#E3EAF0] flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#E3EAF0] shadow-xs">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                  <span className="font-bold text-[#173B63] text-base leading-none">
                    {CLINIC_INFO.rating}
                  </span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col text-xs">
                  <span className="font-semibold text-gray-900">
                    {CLINIC_INFO.reviewCount} {currentLang === 'hi' ? 'गूगल समीक्षाएं' : 'Google Reviews'}
                  </span>
                  <span className="text-gray-500 text-[11px]">
                    {t.hero.ratingBadge}
                  </span>
                </div>
              </div>

              {/* Clinic Timings summary pill */}
              <div className="flex items-center gap-2 text-xs text-gray-700 bg-[#E8F6F3]/70 px-3.5 py-2.5 rounded-xl border border-[#168C8C]/20">
                <Clock className="w-4 h-4 text-[#168C8C] flex-shrink-0" />
                <div>
                  <span className="font-medium">{t.hero.closingInfo}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: High Quality Doctor Showcase Card with Professional Medical Placeholder */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl border border-[#E3EAF0] shadow-xl overflow-hidden relative">
              
              {/* Doctor Visual Header - Medical Practice Card */}
              <div className="relative bg-gradient-to-br from-[#173B63] via-[#1b4573] to-[#168C8C] p-8 text-white text-center">
                
                {/* Decorative medical elements */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-semibold text-white/90 flex items-center gap-1 border border-white/15">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{t.hero.verifiedBadge}</span>
                </div>

                {/* Doctor Portrait Photo */}
                <div className="relative mx-auto w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-white/20 backdrop-blur-md p-1.5 border-2 border-white/40 shadow-xl flex items-center justify-center mb-4">
                  <img
                    src="/src/assets/images/dr_sneha_bakshi_1792062437348.jpg"
                    alt="Dr. Sneha Bakshi (MBBS) - General Physician"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top rounded-full shadow-inner ring-2 ring-white/60"
                  />
                  {/* Active Practice Indicator */}
                  <span
                    className="absolute bottom-1 right-2 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center shadow-md"
                    title={currentLang === 'hi' ? 'सक्रिय परामर्श' : 'Active Practice'}
                  >
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  </span>
                </div>

                {/* Name & Credentials */}
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {currentLang === 'hi' ? CLINIC_INFO.doctorNameHi : CLINIC_INFO.doctorNameEn}
                </h2>
                <p className="text-teal-200 font-semibold text-sm mt-0.5">
                  {CLINIC_INFO.qualification} • {currentLang === 'hi' ? CLINIC_INFO.specializationHi : CLINIC_INFO.specializationEn}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 bg-black/20 text-white/90 text-xs px-3 py-1 rounded-full border border-white/15">
                  <Building2 className="w-3.5 h-3.5 text-teal-300" />
                  <span>{currentLang === 'hi' ? CLINIC_INFO.roleHi : CLINIC_INFO.roleEn}</span>
                </div>
              </div>

              {/* Information Card Body */}
              <div className="p-6 space-y-4 text-sm bg-white">
                
                {/* Clinic Location */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F7FAFC] border border-[#E3EAF0]">
                  <MapPin className="w-5 h-5 text-[#168C8C] flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-semibold text-gray-900">
                      {currentLang === 'hi' ? 'ओपीडी क्लिनिक स्थान' : 'OPD Clinic Location'}
                    </p>
                    <p className="text-gray-600 mt-0.5 leading-snug">
                      {currentLang === 'hi' ? CLINIC_INFO.addressHi : CLINIC_INFO.address}
                    </p>
                  </div>
                </div>

                {/* Consultation Hours */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7FAFC] border border-[#E3EAF0] text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#168C8C]" />
                    <span className="font-semibold text-gray-900">
                      {currentLang === 'hi' ? 'क्लिनिक समय' : 'Clinic Hours'}
                    </span>
                  </div>
                  <span className="font-medium text-[#173B63] bg-white px-2.5 py-1 rounded-md border border-[#E3EAF0]">
                    {currentLang === 'hi' ? 'रात 8:30 बजे तक' : 'Closes at 8:30 PM'}
                  </span>
                </div>

                {/* Languages */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7FAFC] border border-[#E3EAF0] text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-[#168C8C]" />
                    <span className="font-semibold text-gray-900">
                      {currentLang === 'hi' ? 'परामर्श भाषाएं' : 'Languages Spoken'}
                    </span>
                  </div>
                  <span className="font-medium text-gray-700">
                    English & हिंदी
                  </span>
                </div>

                {/* Direct Action Inside Card */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="w-full flex items-center justify-center gap-2 bg-[#E8F6F3] hover:bg-[#d6f0ea] text-[#168C8C] font-semibold py-3 px-4 rounded-xl border border-[#168C8C]/30 transition-all text-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t.about.ctaBtn}</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
