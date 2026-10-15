import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  ShieldAlert, 
  Ambulance, 
  ExternalLink 
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CLINIC_INFO, FAQS } from '../data/clinicData';

interface FaqSectionProps {
  currentLang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-16 sm:py-20 bg-[#F7FAFC] border-b border-[#E3EAF0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#E8F6F3] text-[#168C8C] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-[#168C8C]/20 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#168C8C]" />
            <span>{t.faqs.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#173B63] tracking-tight">
            {t.faqs.heading}
          </h2>
          <p className="mt-3 text-base text-gray-600">
            {t.faqs.subheading}
          </p>
        </div>

        {/* Dedicated Medical Emergency Callout Box */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-50 via-red-50 to-amber-50 border border-red-200 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0">
              <Ambulance className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-red-950 text-base flex items-center gap-2">
                <span>{t.faqs.emergencyCardTitle}</span>
                <span className="text-xs bg-red-600 text-white font-semibold px-2 py-0.5 rounded-full">
                  Dial 108 / 112
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-red-900/90 leading-relaxed">
                {t.faqs.emergencyCardDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const question = currentLang === 'hi' ? faq.questionHi : faq.questionEn;
            const answer = currentLang === 'hi' ? faq.answerHi : faq.answerEn;

            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#E3EAF0] overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#168C8C]"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-[#173B63] leading-snug">
                    {question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    isOpen ? 'bg-[#E8F6F3] text-[#168C8C]' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm text-gray-700 leading-relaxed border-t border-gray-100/80 animate-fadeIn">
                    <p>{answer}</p>
                    
                    {faq.id === 'faq-6' && (
                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                        <a
                          href={`tel:${CLINIC_INFO.phoneTel}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#168C8C] hover:text-[#173B63] bg-[#E8F6F3] px-3 py-1.5 rounded-lg"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call Clinic Desk: {CLINIC_INFO.phoneDisplay}</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Help Footer */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-[#E3EAF0] text-center shadow-xs">
          <p className="text-sm text-gray-700 font-medium">
            {currentLang === 'hi' 
              ? 'क्या आपके मन में कोई अन्य प्रश्न है? सीधे क्लिनिक से संपर्क करें:' 
              : 'Have additional questions before your consultation? Contact the clinic directly:'}
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${CLINIC_INFO.phoneTel}`}
              className="inline-flex items-center gap-2 bg-[#173B63] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#122e4d] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#168C8C]" />
              <span>{CLINIC_INFO.phoneDisplay}</span>
            </a>
            <a
              href={CLINIC_INFO.getWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#20ba5a] transition-colors"
            >
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
