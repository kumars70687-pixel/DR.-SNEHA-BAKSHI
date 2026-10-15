import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Calendar, 
  Menu, 
  X, 
  Globe, 
  Clock, 
  ShieldAlert, 
  MapPin, 
  CheckCircle2,
  Stethoscope
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CLINIC_INFO } from '../data/clinicData';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
  onOpenRequestsList: () => void;
  requestCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenBooking,
  onOpenRequestsList,
  requestCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dismissEmergency, setDismissEmergency] = useState(false);

  const t = TRANSLATIONS[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#reviews', label: t.nav.reviews },
    { href: '#faqs', label: t.nav.faqs },
    { href: '#location', label: t.nav.contact }
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Emergency Notice Strip */}
      {!dismissEmergency && (
        <div className="bg-[#173B63] text-white text-xs sm:text-sm px-4 py-1.5 flex items-center justify-between border-b border-white/10">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-200 border border-amber-400/30 font-semibold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
                {t.emergencyBanner.alert}
              </span>
              <span className="text-gray-200 text-xs sm:text-sm truncate">
                {t.emergencyBanner.text}
              </span>
            </div>
            <button
              onClick={() => setDismissEmergency(true)}
              className="text-gray-400 hover:text-white p-1 rounded transition-colors text-xs flex-shrink-0"
              aria-label="Dismiss emergency notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E3EAF0] py-3'
            : 'bg-white border-b border-[#E3EAF0] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo & Name */}
            <a
              href="#home"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#168C8C] rounded-lg p-1 -m-1"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#173B63] to-[#168C8C] flex items-center justify-center text-white shadow-sm group-hover:shadow transition-shadow">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg sm:text-xl text-[#173B63] tracking-tight group-hover:text-[#168C8C] transition-colors">
                    {currentLang === 'hi' ? CLINIC_INFO.doctorNameHi : CLINIC_INFO.doctorNameEn}
                  </span>
                  <span className="bg-[#E8F6F3] text-[#168C8C] text-[11px] font-bold px-1.5 py-0.5 rounded border border-[#168C8C]/20">
                    {CLINIC_INFO.qualification}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span>{currentLang === 'hi' ? CLINIC_INFO.specializationHi : CLINIC_INFO.specializationEn}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 hidden sm:inline truncate max-w-[200px]">
                    {currentLang === 'hi' ? 'न्यू मेड अस्पताल' : 'Nu Med Hospital'}
                  </span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-[#168C8C] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#168C8C] after:absolute after:bottom-0 after:left-0 after:transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Header Right Actions */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center bg-[#F7FAFC] border border-[#E3EAF0] rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => onLanguageChange('en')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    currentLang === 'en'
                      ? 'bg-white text-[#173B63] shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('hi')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    currentLang === 'hi'
                      ? 'bg-white text-[#173B63] shadow-xs font-devanagari'
                      : 'text-gray-600 hover:text-gray-900 font-devanagari'
                  }`}
                  aria-label="हिंदी में बदलें"
                >
                  हिंदी
                </button>
              </div>

              {/* Direct Call Button */}
              <a
                href={`tel:${CLINIC_INFO.phoneTel}`}
                className="hidden xl:inline-flex items-center gap-2 text-sm font-medium text-[#173B63] hover:text-[#168C8C] px-3 py-2 rounded-lg hover:bg-[#F7FAFC] transition-colors border border-transparent hover:border-[#E3EAF0]"
                title="Call Clinic Directly"
              >
                <Phone className="w-4 h-4 text-[#168C8C]" />
                <span>{CLINIC_INFO.phoneDisplay}</span>
              </a>

              {/* My Requests (if any) */}
              {requestCount > 0 && (
                <button
                  type="button"
                  onClick={onOpenRequestsList}
                  className="relative p-2 text-gray-600 hover:text-[#173B63] rounded-lg hover:bg-gray-100 transition-colors"
                  title="View your appointment request tokens"
                >
                  <Clock className="w-5 h-5 text-[#168C8C]" />
                  <span className="absolute -top-1 -right-1 bg-[#168C8C] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {requestCount}
                  </span>
                </button>
              )}

              {/* Book Appointment CTA */}
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 bg-[#173B63] hover:bg-[#122e4d] text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-sm hover:shadow active:scale-98"
              >
                <Calendar className="w-4 h-4 text-[#168C8C]" />
                <span>{t.nav.bookAppointment}</span>
              </button>
            </div>

            {/* Mobile Controls & Hamburger */}
            <div className="flex sm:hidden items-center gap-2">
              {/* Language Switcher Mobile */}
              <button
                type="button"
                onClick={() => onLanguageChange(currentLang === 'en' ? 'hi' : 'en')}
                className="p-1.5 text-xs font-bold text-[#173B63] border border-[#E3EAF0] rounded-lg bg-gray-50 flex items-center gap-1"
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5 text-[#168C8C]" />
                <span>{currentLang === 'en' ? 'हिंदी' : 'EN'}</span>
              </button>

              <a
                href={`tel:${CLINIC_INFO.phoneTel}`}
                className="p-2 text-[#168C8C] bg-[#E8F6F3] rounded-lg"
                aria-label="Call clinic"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-[#E3EAF0] bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
            {/* Quick Status Info */}
            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200/60 p-2.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{currentLang === 'hi' ? 'आज क्लिनिक रात 8:30 बजे तक खुला है' : 'Clinic open until 8:30 PM today'}</span>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col space-y-2 pt-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="text-gray-700 hover:text-[#168C8C] font-medium py-2 px-3 rounded-md hover:bg-[#F7FAFC] transition-colors text-base"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#173B63] text-white py-2.5 rounded-lg font-semibold text-sm shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#168C8C]" />
                {t.nav.bookAppointment}
              </button>

              <a
                href={`tel:${CLINIC_INFO.phoneTel}`}
                className="w-full flex items-center justify-center gap-2 border border-[#168C8C] text-[#173B63] py-2.5 rounded-lg font-semibold text-sm hover:bg-[#E8F6F3]"
              >
                <Phone className="w-4 h-4 text-[#168C8C]" />
                {t.nav.callNow} ({CLINIC_INFO.phoneDisplay})
              </a>

              {requestCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRequestsList();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-700 py-2 rounded-lg text-xs font-medium border border-gray-200"
                >
                  <Clock className="w-4 h-4 text-[#168C8C]" />
                  <span>{t.nav.myBookings} ({requestCount})</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
