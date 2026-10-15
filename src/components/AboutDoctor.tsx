import React from 'react';
import { 
  Award, 
  Building2, 
  MapPin, 
  Clock, 
  Languages, 
  CheckCircle2, 
  Calendar, 
  Stethoscope, 
  FileText, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CLINIC_INFO } from '../data/clinicData';

interface AboutDoctorProps {
  currentLang: Language;
  onOpenBooking: () => void;
  customNotice?: string;
  onOpenAdminModal: () => void;
}

export const AboutDoctor: React.FC<AboutDoctorProps> = ({
  currentLang,
  onOpenBooking,
  customNotice,
  onOpenAdminModal
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="about" className="py-16 sm:py-20 bg-white border-b border-[#E3EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#E8F6F3] text-[#168C8C] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-[#168C8C]/20 mb-3">
            <Award className="w-3.5 h-3.5 text-[#168C8C]" />
            <span>{t.about.sectionBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#173B63] tracking-tight">
            {currentLang === 'hi' ? 'डॉ. स्नेहा बख्शी (एमबीबीएस)' : 'Dr. Sneha Bakshi (MBBS)'}
          </h2>
          <p className="mt-1 text-lg font-medium text-[#168C8C]">
            {currentLang === 'hi' ? 'जनरल फिजिशियन • न्यू मेड अस्पताल में विजिटिंग कंसल्टेंट' : 'General Physician • Visiting Consultant at Nu Med Hospital'}
          </p>
          <div className="mt-4 p-5 rounded-2xl bg-[#F7FAFC] border border-[#E3EAF0] text-gray-700 leading-relaxed text-base text-left sm:text-center shadow-xs">
            <p>
              "{t.about.intro}"
            </p>
          </div>
        </div>

        {/* Dynamic Clinic Notice (if set by admin) */}
        {customNotice && (
          <div className="mb-10 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-bold">{currentLang === 'hi' ? 'क्लिनिक सूचना: ' : 'Clinic Notice: '}</span>
              <span>{customNotice}</span>
            </div>
          </div>
        )}

        {/* Structured Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Medical Qualifications */}
          <div className="bg-[#F7FAFC] rounded-2xl p-6 border border-[#E3EAF0] hover:border-[#168C8C]/40 transition-colors shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#173B63] text-white flex items-center justify-center mb-4">
              <Award className="w-5 h-5 text-[#168C8C]" />
            </div>
            <h3 className="text-lg font-bold text-[#173B63] mb-2">
              {t.about.qualificationsTitle}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.about.qualificationsDesc}
            </p>
            <div className="mt-4 pt-3 border-t border-[#E3EAF0] text-xs font-semibold text-[#168C8C] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Degree: MBBS (Bachelor of Medicine & Surgery)</span>
            </div>
          </div>

          {/* Card 2: Clinical Practice */}
          <div className="bg-[#F7FAFC] rounded-2xl p-6 border border-[#E3EAF0] hover:border-[#168C8C]/40 transition-colors shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#173B63] text-white flex items-center justify-center mb-4">
              <Stethoscope className="w-5 h-5 text-[#168C8C]" />
            </div>
            <h3 className="text-lg font-bold text-[#173B63] mb-2">
              {t.about.specializationTitle}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.about.specializationDesc}
            </p>
            <div className="mt-4 pt-3 border-t border-[#E3EAF0] text-xs font-semibold text-[#168C8C] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Primary Medical Care & Family Health</span>
            </div>
          </div>

          {/* Card 3: Hospital Affiliation */}
          <div className="bg-[#F7FAFC] rounded-2xl p-6 border border-[#E3EAF0] hover:border-[#168C8C]/40 transition-colors shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#173B63] text-white flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5 text-[#168C8C]" />
            </div>
            <h3 className="text-lg font-bold text-[#173B63] mb-2">
              {t.about.affiliationTitle}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.about.affiliationDesc}
            </p>
            <div className="mt-4 pt-3 border-t border-[#E3EAF0] text-xs font-semibold text-[#173B63] flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#168C8C]" />
              <span>Visiting Consultant - Nu Med Hospital</span>
            </div>
          </div>

          {/* Card 4: Outpatient Clinic Location */}
          <div className="bg-[#F7FAFC] rounded-2xl p-6 border border-[#E3EAF0] hover:border-[#168C8C]/40 transition-colors shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#173B63] text-white flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-[#168C8C]" />
            </div>
            <h3 className="text-lg font-bold text-[#173B63] mb-2">
              {t.about.locationRoleTitle}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.about.locationRoleDesc}
            </p>
            <div className="mt-4 pt-3 border-t border-[#E3EAF0] text-xs font-semibold text-gray-600">
              Supertech Eco Village-2, Noida (Plus Code: JC6R+5M)
            </div>
          </div>

          {/* Card 5: Languages Spoken */}
          <div className="bg-[#F7FAFC] rounded-2xl p-6 border border-[#E3EAF0] hover:border-[#168C8C]/40 transition-colors shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#173B63] text-white flex items-center justify-center mb-4">
              <Languages className="w-5 h-5 text-[#168C8C]" />
            </div>
            <h3 className="text-lg font-bold text-[#173B63] mb-2">
              {t.about.languagesTitle}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.about.languagesDesc}
            </p>
            <div className="mt-4 pt-3 border-t border-[#E3EAF0] text-xs font-semibold text-[#168C8C] flex items-center gap-2">
              <span className="bg-white px-2 py-0.5 rounded border border-[#E3EAF0]">English</span>
              <span className="bg-white px-2 py-0.5 rounded border border-[#E3EAF0]">हिंदी (Hindi)</span>
            </div>
          </div>

          {/* Card 6: Clinic Availability */}
          <div className="bg-[#F7FAFC] rounded-2xl p-6 border border-[#E3EAF0] hover:border-[#168C8C]/40 transition-colors shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#173B63] text-white flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-[#168C8C]" />
            </div>
            <h3 className="text-lg font-bold text-[#173B63] mb-2">
              {t.about.availabilityTitle}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t.about.availabilityDesc}
            </p>
            <div className="mt-4 pt-3 border-t border-[#E3EAF0] text-xs font-semibold text-[#173B63]">
              Listed Closing Time: <span className="text-[#168C8C]">{CLINIC_INFO.closingTime}</span>
            </div>
          </div>

        </div>

        {/* 4-Step Consultation Process */}
        <div className="bg-gradient-to-br from-[#173B63] to-[#122e4d] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-lg">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-white/10 px-3 py-1 rounded-full border border-white/15 inline-block mb-2">
              Patient Care Pathway
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t.about.processTitle}
            </h3>
            <p className="text-gray-300 text-sm mt-1">
              {currentLang === 'hi' 
                ? 'प्रत्येक मरीज को दिया जाता है पूरा समय, ताकि सही जांच और सटीक सलाह सुनिश्चित हो सके।'
                : 'Every consultation is organized to ensure you feel heard, properly examined, and fully informed.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-5 border border-white/15">
              <div className="w-8 h-8 rounded-lg bg-teal-400 text-[#173B63] font-bold flex items-center justify-center text-sm mb-3">
                1
              </div>
              <h4 className="font-bold text-base text-white mb-1.5">{t.about.step1Title}</h4>
              <p className="text-xs text-gray-300 leading-relaxed">{t.about.step1Desc}</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-5 border border-white/15">
              <div className="w-8 h-8 rounded-lg bg-teal-400 text-[#173B63] font-bold flex items-center justify-center text-sm mb-3">
                2
              </div>
              <h4 className="font-bold text-base text-white mb-1.5">{t.about.step2Title}</h4>
              <p className="text-xs text-gray-300 leading-relaxed">{t.about.step2Desc}</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-5 border border-white/15">
              <div className="w-8 h-8 rounded-lg bg-teal-400 text-[#173B63] font-bold flex items-center justify-center text-sm mb-3">
                3
              </div>
              <h4 className="font-bold text-base text-white mb-1.5">{t.about.step3Title}</h4>
              <p className="text-xs text-gray-300 leading-relaxed">{t.about.step3Desc}</p>
            </div>

            {/* Step 4 */}
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-5 border border-white/15">
              <div className="w-8 h-8 rounded-lg bg-teal-400 text-[#173B63] font-bold flex items-center justify-center text-sm mb-3">
                4
              </div>
              <h4 className="font-bold text-base text-white mb-1.5">{t.about.step4Title}</h4>
              <p className="text-xs text-gray-300 leading-relaxed">{t.about.step4Desc}</p>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-300 max-w-lg">
              {currentLang === 'hi'
                ? 'निजी ओपीडी क्लिनिक परामर्श कल्याण फार्मेसी, सुपरटेक इको विलेज-2 में उपलब्ध हैं।'
                : 'Private outpatient consultations are conducted at Kalyan Pharmacy, Supertech Eco Village-2, Noida.'}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 bg-[#168C8C] hover:bg-[#137979] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all active:scale-98"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.about.ctaBtn}</span>
              </button>
              <button
                type="button"
                onClick={onOpenAdminModal}
                className="text-xs text-teal-300 hover:text-white underline underline-offset-4 transition-colors"
                title="Clinic staff portal"
              >
                {currentLang === 'hi' ? 'क्लिनिक स्टाफ नोट' : 'Staff Notice Board'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
