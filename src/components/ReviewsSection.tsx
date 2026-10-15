import React from 'react';
import { 
  Star, 
  ExternalLink, 
  CheckCircle, 
  ShieldCheck, 
  Heart, 
  MessageSquare, 
  Sparkles,
  Info
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CLINIC_INFO, REVIEW_THEMES } from '../data/clinicData';

interface ReviewsSectionProps {
  currentLang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-[#F7FAFC] border-b border-[#E3EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#E8F6F3] text-[#168C8C] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-[#168C8C]/20 mb-3">
            <Star className="w-3.5 h-3.5 fill-[#168C8C] text-[#168C8C]" />
            <span>{t.reviews.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#173B63] tracking-tight">
            {t.reviews.heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            {t.reviews.subheading}
          </p>
        </div>

        {/* Big Overall Rating Feature Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-[#E3EAF0] shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Star & Rating Display */}
            <div className="md:col-span-5 text-center md:text-left md:border-r md:border-[#E3EAF0] md:pr-8">
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="text-5xl sm:text-6xl font-extrabold text-[#173B63] tracking-tight">
                  {CLINIC_INFO.rating}
                </span>
                <span className="text-xl font-bold text-gray-400">/ 5.0</span>
              </div>

              {/* 5 Stars */}
              <div className="flex items-center justify-center md:justify-start gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <div className="mt-3">
                <p className="font-bold text-[#173B63] text-sm">
                  {CLINIC_INFO.reviewCount} {currentLang === 'hi' ? 'गूगल समीक्षाएं' : 'Google Reviews'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {currentLang === 'hi' 
                    ? 'सार्वजनिक लिस्टिंग पर आधारित आंकड़ा' 
                    : 'Information as listed on public clinic profile'}
                </p>
              </div>

              {/* Google Reviews link */}
              <div className="mt-5">
                <a
                  href={CLINIC_INFO.googleReviewSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#F7FAFC] hover:bg-[#E8F6F3] text-[#173B63] hover:text-[#168C8C] text-xs font-semibold px-4 py-2.5 rounded-xl border border-[#E3EAF0] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#168C8C]" />
                  <span>{t.reviews.googleListingLink}</span>
                </a>
              </div>
            </div>

            {/* Right: Summary of Patient Feedback Pillars */}
            <div className="md:col-span-7 space-y-3">
              <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500">
                {currentLang === 'hi' ? 'समीक्षाओं में प्रमुख अनुभव' : 'Key Patient Experience Themes'}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7FAFC] border border-[#E3EAF0]">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">
                      {currentLang === 'hi' ? 'धैर्यपूर्वक सुनना' : 'Attentive Listening'}
                    </span>
                    <span className="text-gray-500">
                      {currentLang === 'hi' ? 'लक्षणों को बिना जल्दबाजी के सुनना' : 'Adequate time for each consultation'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7FAFC] border border-[#E3EAF0]">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">
                      {currentLang === 'hi' ? 'स्पष्ट समझाइश' : 'Clear Explanation'}
                    </span>
                    <span className="text-gray-500">
                      {currentLang === 'hi' ? 'दवाओं और परहेज की आसान जानकारी' : 'Transparent guidance on prescriptions'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7FAFC] border border-[#E3EAF0]">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">
                      {currentLang === 'hi' ? 'विनम्र संवाद' : 'Courteous Conduct'}
                    </span>
                    <span className="text-gray-500">
                      {currentLang === 'hi' ? 'सहज व तनावमुक्त परामर्श' : 'Calm and reassuring bedside manner'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7FAFC] border border-[#E3EAF0]">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block">
                      {currentLang === 'hi' ? 'सुलभ स्थानीय क्लिनिक' : 'Local Accessibility'}
                    </span>
                    <span className="text-gray-500">
                      {currentLang === 'hi' ? 'सुपरटेक इको विलेज-2 में स्थित' : 'In Supertech Eco Village-2, Noida'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Curated Theme Cards based on provided listing themes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEW_THEMES.map((theme, index) => {
            const title = currentLang === 'hi' ? theme.titleHi : theme.titleEn;
            const desc = currentLang === 'hi' ? theme.descHi : theme.descEn;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-[#E3EAF0] hover:border-[#168C8C]/50 transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-[#E8F6F3] text-[#168C8C] text-[11px] font-bold px-2 py-0.5 rounded border border-[#168C8C]/20">
                      {theme.highlightTag}
                    </span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <h4 className="font-bold text-base text-[#173B63] mb-2">
                    {title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    "{desc}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Google Listing Highlight</span>
                  <span>4.8 ★</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ethical Review Disclaimer */}
        <div className="max-w-3xl mx-auto mt-10 text-center">
          <p className="text-xs text-gray-500 leading-relaxed flex items-center justify-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span>{t.reviews.disclaimer}</span>
          </p>
        </div>

      </div>
    </section>
  );
};
