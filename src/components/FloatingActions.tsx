import React, { useState } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { Language } from '../types';

interface FloatingActionsProps {
  currentLang: Language;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ currentLang }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = CLINIC_INFO.getWhatsappUrl(CLINIC_INFO.whatsappMessage);

  return (
    <aside aria-label="Quick contact actions" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 no-print">
      
      {/* WhatsApp Floating Contact */}
      <div className="relative flex items-center group">
        {/* Tooltip on Desktop hover */}
        <div
          className={`hidden sm:block absolute right-16 bg-[#173B63] text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-md transition-all duration-200 pointer-events-none ${
            showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          {currentLang === 'hi' ? 'व्हाट्सएप पर अपॉइंटमेंट पूछें' : 'Enquire via WhatsApp'}
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 group relative"
          aria-label="Contact Dr. Sneha Bakshi clinic via WhatsApp"
        >
          {/* Subtle Radar Wave */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping -z-10 opacity-75"></span>
          
          <MessageCircle className="w-7 h-7 fill-white text-white" />
        </a>
      </div>

      {/* Floating Quick Call Button for Mobile Users */}
      <div className="sm:hidden">
        <a
          href={`tel:${CLINIC_INFO.phoneTel}`}
          className="w-12 h-12 bg-[#173B63] hover:bg-[#122e4d] text-white rounded-full flex items-center justify-center shadow-md active:scale-95"
          aria-label="Call clinic directly"
        >
          <Phone className="w-5 h-5 text-[#168C8C]" />
        </a>
      </div>

    </aside>
  );
};
