import React, { useState } from 'react';
import { 
  Stethoscope, 
  Thermometer, 
  ClipboardCheck, 
  ShieldAlert, 
  Activity, 
  Clock, 
  HeartPulse, 
  Users, 
  Calendar, 
  ArrowRight,
  Info,
  Check
} from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MEDICAL_SERVICES } from '../data/clinicData';

interface ServicesSectionProps {
  currentLang: Language;
  onSelectServiceForBooking: (serviceTitle: string) => void;
  onOpenBooking: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currentLang,
  onSelectServiceForBooking,
  onOpenBooking
}) => {
  const t = TRANSLATIONS[currentLang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-[#168C8C]" />;
      case 'Thermometer':
        return <Thermometer className="w-6 h-6 text-[#168C8C]" />;
      case 'ClipboardCheck':
        return <ClipboardCheck className="w-6 h-6 text-[#168C8C]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-[#168C8C]" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-[#168C8C]" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-[#168C8C]" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-[#168C8C]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[#168C8C]" />;
      default:
        return <Stethoscope className="w-6 h-6 text-[#168C8C]" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-[#F7FAFC] border-b border-[#E3EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#E8F6F3] text-[#168C8C] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-[#168C8C]/20 mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-[#168C8C]" />
            <span>{t.services.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#173B63] tracking-tight">
            {t.services.heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            {t.services.subheading}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {MEDICAL_SERVICES.map((service) => {
            const title = currentLang === 'hi' ? service.titleHi : service.titleEn;
            const desc = currentLang === 'hi' ? service.descHi : service.descEn;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-[#E3EAF0] hover:border-[#168C8C] hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#E8F6F3] group-hover:bg-[#168C8C]/15 flex items-center justify-center mb-4 transition-colors">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <h3 className="font-bold text-lg text-[#173B63] mb-2 group-hover:text-[#168C8C] transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectServiceForBooking(title)}
                    className="text-xs font-semibold text-[#168C8C] hover:text-[#173B63] flex items-center gap-1 transition-colors"
                  >
                    <span>{t.services.bookThisService}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-[11px] text-gray-400">MBBS OPD</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clinical Disclaimer Notice */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-4 border border-[#E3EAF0] text-xs text-gray-500 leading-relaxed flex items-start gap-3 shadow-xs mb-10">
          <Info className="w-4 h-4 text-[#168C8C] flex-shrink-0 mt-0.5" />
          <p>{t.services.disclaimer}</p>
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2.5 bg-[#173B63] hover:bg-[#122e4d] text-white font-semibold px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98 text-base"
          >
            <Calendar className="w-5 h-5 text-[#168C8C]" />
            <span>{t.services.bookCta}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
