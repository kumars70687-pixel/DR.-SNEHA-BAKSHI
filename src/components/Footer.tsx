import React, { useState } from 'react';
import { 
  Stethoscope, 
  MapPin, 
  Phone, 
  Clock, 
  Building2, 
  Calendar, 
  ShieldAlert, 
  ArrowUp,
  X
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CLINIC_INFO } from '../data/clinicData';

interface FooterProps {
  currentLang: Language;
  onOpenBooking: () => void;
  onOpenAdminModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  currentLang, 
  onOpenBooking,
  onOpenAdminModal 
}) => {
  const t = TRANSLATIONS[currentLang];
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#172B3A] text-white pt-16 pb-12 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Doctor Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#173B63] to-[#168C8C] flex items-center justify-center text-white border border-white/20">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-lg text-white">
                  {currentLang === 'hi' ? CLINIC_INFO.doctorNameHi : CLINIC_INFO.doctorNameEn}
                </span>
                <span className="ml-2 bg-[#168C8C]/30 text-teal-300 text-xs font-bold px-2 py-0.5 rounded border border-teal-400/30">
                  {CLINIC_INFO.qualification}
                </span>
              </div>
            </div>

            <p className="text-teal-300 text-sm font-semibold">
              {currentLang === 'hi' ? CLINIC_INFO.specializationHi : CLINIC_INFO.specializationEn}
            </p>

            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-gray-300">
              <Building2 className="w-3.5 h-3.5 text-teal-400" />
              <span>{currentLang === 'hi' ? CLINIC_INFO.roleHi : CLINIC_INFO.roleEn}</span>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 bg-[#168C8C] hover:bg-[#137979] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-98"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.nav.bookAppointment}</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#home" className="hover:text-teal-300 transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-300 transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-300 transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-teal-300 transition-colors">
                  {t.nav.reviews}
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-teal-300 transition-colors">
                  {t.nav.faqs}
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-teal-300 transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Clinic Contact & Operating Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              {t.footer.contactInfo}
            </h3>
            
            <div className="space-y-3 text-xs sm:text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <span>{currentLang === 'hi' ? CLINIC_INFO.addressHi : CLINIC_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <a
                  href={`tel:${CLINIC_INFO.phoneTel}`}
                  className="hover:text-teal-300 font-semibold"
                >
                  {CLINIC_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>{t.footer.hoursNote}</span>
              </div>

              <div className="pt-2">
                <span className="text-[11px] text-gray-400 block mb-1">
                  Google Plus Code: <span className="text-gray-200 font-mono font-bold">{CLINIC_INFO.plusCode}</span>
                </span>
                <button
                  type="button"
                  onClick={onOpenAdminModal}
                  className="text-[11px] text-teal-400 hover:text-white underline"
                >
                  {currentLang === 'hi' ? 'क्लिनिक स्टाफ / एडमिन पैनल' : 'Clinic Desk Portal'}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Mandatory Medical Disclaimer Banner */}
        <div className="my-8 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300 leading-relaxed space-y-1.5">
          <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider text-[11px]">
            <ShieldAlert className="w-4 h-4" />
            <span>{t.footer.disclaimerTitle}</span>
          </div>
          <p className="text-gray-300">
            {t.footer.disclaimerText}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Dr. Sneha Bakshi (MBBS). {t.footer.allRightsReserved}
          </p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowPrivacyModal(true)}
              className="hover:text-teal-300 transition-colors underline-offset-4 hover:underline"
            >
              {t.footer.privacyPolicy}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="hover:text-teal-300 transition-colors underline-offset-4 hover:underline"
            >
              {t.footer.termsOfUse}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 rounded-2xl max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto relative shadow-2xl">
            <button
              type="button"
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-[#173B63] mb-3">
              {t.footer.privacyPolicy}
            </h3>
            <div className="text-xs sm:text-sm text-gray-700 space-y-3 leading-relaxed">
              <p>
                <strong>1. Patient Data Confidentiality:</strong> Any personal information (such as name and phone number) provided via the appointment enquiry form is strictly utilized to respond to appointment scheduling requests.
              </p>
              <p>
                <strong>2. No Public Disclosure:</strong> Patient enquiries are never disclosed publicly, sold, or shared with third-party advertisers.
              </p>
              <p>
                <strong>3. Minimum Data Collection:</strong> We do not collect unnecessary health records through online forms. In-depth medical history is discussed directly in private consultation with Dr. Sneha Bakshi.
              </p>
              <p>
                <strong>4. Demonstration Mode:</strong> Submissions in this preview build are securely held within your browser session and not transmitted to external servers.
              </p>
            </div>
            <div className="mt-5 text-right">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="bg-[#173B63] text-white px-4 py-2 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Use Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 rounded-2xl max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto relative shadow-2xl">
            <button
              type="button"
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-[#173B63] mb-3">
              {t.footer.termsOfUse}
            </h3>
            <div className="text-xs sm:text-sm text-gray-700 space-y-3 leading-relaxed">
              <p>
                <strong>1. Informational Purpose:</strong> The content provided on this website is intended solely for patient guidance, clinic discovery, and preliminary appointment requests.
              </p>
              <p>
                <strong>2. No Doctor-Patient Relationship:</strong> Submitting an online request does not establish a formal doctor-patient relationship until an in-person clinical assessment is carried out.
              </p>
              <p>
                <strong>3. Non-Emergency:</strong> This website cannot be used to request immediate emergency care. For urgent emergencies, always dial 108 or 112 or visit the nearest hospital emergency department.
              </p>
              <p>
                <strong>4. Independence of Practice:</strong> Dr. Sneha Bakshi serves as a Visiting Consultant at Nu Med Hospital; this website represents her general physician practice at Kalyan Pharmacy, Supertech Eco Village-2.
              </p>
            </div>
            <div className="mt-5 text-right">
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="bg-[#173B63] text-white px-4 py-2 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
