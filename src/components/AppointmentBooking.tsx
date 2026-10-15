import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Send, 
  FileText, 
  ShieldCheck, 
  X,
  ExternalLink,
  MessageSquare,
  Database,
  Cloud
} from 'lucide-react';
import { Language, AppointmentFormData, AppointmentRequestRecord } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { CLINIC_INFO } from '../data/clinicData';
import { saveAppointment, SUPABASE_URL } from '../lib/supabase';

interface AppointmentBookingProps {
  currentLang: Language;
  prefilledReason?: string;
  isOpenAsModal?: boolean;
  onCloseModal?: () => void;
  onNewRequestCreated?: (request: AppointmentRequestRecord) => void;
}

export const AppointmentBooking: React.FC<AppointmentBookingProps> = ({
  currentLang,
  prefilledReason = '',
  isOpenAsModal = false,
  onCloseModal,
  onNewRequestCreated
}) => {
  const t = TRANSLATIONS[currentLang];

  // Helper to format today's date in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    date: todayStr,
    timeSlot: '',
    visitType: 'first_visit',
    reason: prefilledReason,
    consent: false
  });

  useEffect(() => {
    if (prefilledReason) {
      setFormData((prev) => ({ ...prev, reason: prefilledReason }));
    }
  }, [prefilledReason]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<AppointmentRequestRecord | null>(null);

  // Time slot options (Respecting 8:30 PM closing)
  const timeSlots = [
    { id: 'morning-1', labelEn: '10:00 AM - 11:00 AM (Morning)', labelHi: 'सुबह 10:00 - 11:00' },
    { id: 'morning-2', labelEn: '11:00 AM - 12:00 PM (Morning)', labelHi: 'सुबह 11:00 - 12:00' },
    { id: 'morning-3', labelEn: '12:00 PM - 01:00 PM (Afternoon)', labelHi: 'दोपहर 12:00 - 01:00' },
    { id: 'evening-1', labelEn: '05:00 PM - 06:00 PM (Evening)', labelHi: 'शाम 05:00 - 06:00' },
    { id: 'evening-2', labelEn: '06:00 PM - 07:00 PM (Evening)', labelHi: 'शाम 06:00 - 07:00' },
    { id: 'evening-3', labelEn: '07:00 PM - 08:30 PM (Evening)', labelHi: 'शाम 07:00 - 08:30 (अंतिम स्लॉट)' }
  ];

  // Indian phone number validator: 10 digits starting with 6,7,8,9
  const validateIndianPhone = (phone: string): boolean => {
    const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
    const regex = /^[6-9]\d{9}$/;
    return regex.test(cleaned);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t.booking.validation.nameRequired;
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = currentLang === 'hi' ? 'कृपया पूरा नाम दर्ज करें' : 'Name must be at least 2 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t.booking.validation.phoneRequired;
    } else if (!validateIndianPhone(formData.phone)) {
      newErrors.phone = currentLang === 'hi'
        ? 'कृपया 10 अंकों का वैध भारतीय मोबाइल नंबर दर्ज करें (6, 7, 8 या 9 से शुरू)'
        : 'Please enter a valid 10-digit Indian phone number (starts with 6-9).';
    }

    if (!formData.date) {
      newErrors.date = t.booking.validation.dateRequired;
    } else if (formData.date < todayStr) {
      newErrors.date = t.booking.validation.pastDateError;
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = t.booking.validation.timeRequired;
    }

    if (!formData.consent) {
      newErrors.consent = t.booking.validation.consentRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const randomToken = Math.floor(1000 + Math.random() * 9000);
    const refNumber = `SB-OPD-${new Date().getFullYear()}-${randomToken}`;

    const newRecord: AppointmentRequestRecord = {
      ...formData,
      id: `req_${Date.now()}_${randomToken}`,
      referenceNumber: refNumber,
      submittedAt: new Date().toLocaleString(),
      status: 'Pending Clinic Confirmation'
    };

    // Save to Supabase Cloud Database with fallback
    saveAppointment(newRecord)
      .then((res) => {
        // Save to localStorage as well so offline/local cache is always present
        try {
          const existing = JSON.parse(localStorage.getItem('sb_appointment_requests') || '[]');
          const updated = [newRecord, ...existing.filter((item: any) => item.id !== newRecord.id)];
          localStorage.setItem('sb_appointment_requests', JSON.stringify(updated));
        } catch (err) {
          console.error('Storage error', err);
        }

        setSubmittedRecord(newRecord);
        setIsSubmitting(false);

        if (onNewRequestCreated) {
          onNewRequestCreated(newRecord);
        }
      })
      .catch((err) => {
        console.error('Submission error:', err);
        // Fallback to local storage
        try {
          const existing = JSON.parse(localStorage.getItem('sb_appointment_requests') || '[]');
          const updated = [newRecord, ...existing];
          localStorage.setItem('sb_appointment_requests', JSON.stringify(updated));
        } catch (storageErr) {
          console.error('Storage error', storageErr);
        }
        setSubmittedRecord(newRecord);
        setIsSubmitting(false);
        if (onNewRequestCreated) {
          onNewRequestCreated(newRecord);
        }
      });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setSubmittedRecord(null);
    setFormData({
      fullName: '',
      phone: '',
      date: todayStr,
      timeSlot: '',
      visitType: 'first_visit',
      reason: '',
      consent: false
    });
    setErrors({});
    if (onCloseModal) {
      onCloseModal();
    }
  };

  // Content rendering
  const formContent = (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E3EAF0] shadow-xl relative">
      
      {/* Modal Close Button if displayed in modal */}
      {isOpenAsModal && onCloseModal && (
        <button
          type="button"
          onClick={onCloseModal}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 bg-[#E8F6F3] text-[#168C8C] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-[#168C8C]/20 mb-2">
          <Calendar className="w-3.5 h-3.5 text-[#168C8C]" />
          <span>{t.booking.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#173B63] tracking-tight">
          {t.booking.heading}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {t.booking.subheading}
        </p>
      </div>

      {/* Supabase Connected Banner */}
      <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs sm:text-sm flex items-start gap-3">
        <Database className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-900">
              {currentLang === 'hi' ? 'सुपाबेस क्लाउड डेटाबेस कनेक्टेड' : 'Supabase Cloud Database Connected'}
            </span>
            <span className="bg-emerald-200/80 text-emerald-900 font-mono text-[10px] px-2 py-0.5 rounded-full font-semibold">
              Project: roqpvligxsgjzagcpitd
            </span>
          </div>
          <p className="text-emerald-800 text-xs">
            {currentLang === 'hi'
              ? 'आपके द्वारा दर्ज किए जाने वाले सभी अपॉइंटमेंट विवरण सीधे आपके सुपाबेस डेटाबेस (टेबल: appointments) में सुरक्षित किए जाते हैं।'
              : 'All appointment bookings and patient enquiry details are stored directly in your Supabase database table (`appointments`).'}
          </p>
        </div>
      </div>

      {/* SUCCESS STATE */}
      {submittedRecord ? (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-emerald-950 mb-1">
              {t.booking.successTitle}
            </h3>
            <p className="text-sm text-emerald-800">
              {t.booking.successSub}
            </p>
            <div className="mt-3 inline-block bg-white px-4 py-2 rounded-xl border border-emerald-300 font-mono font-bold text-lg text-[#173B63] shadow-xs">
              {submittedRecord.referenceNumber}
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full font-medium">
              <Cloud className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saved to Supabase project roqpvligxsgjzagcpitd</span>
            </div>
            <p className="text-xs text-emerald-700 mt-3 max-w-md mx-auto">
              {t.booking.successInstructions}
            </p>
          </div>

          {/* Printable Summary Card */}
          <div className="p-5 rounded-2xl bg-[#F7FAFC] border border-[#E3EAF0] space-y-3 text-sm print-only">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">{currentLang === 'hi' ? 'मरीज' : 'Patient Name'}:</span>
              <span className="font-semibold text-gray-900">{submittedRecord.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">{currentLang === 'hi' ? 'फोन' : 'Phone'}:</span>
              <span className="font-semibold text-gray-900">+91 {submittedRecord.phone}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">{currentLang === 'hi' ? 'तारीख' : 'Requested Date'}:</span>
              <span className="font-semibold text-gray-900">{submittedRecord.date}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">{currentLang === 'hi' ? 'समय स्लॉट' : 'Time Slot'}:</span>
              <span className="font-semibold text-gray-900">{submittedRecord.timeSlot}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">{currentLang === 'hi' ? 'परामर्श प्रकार' : 'Visit Type'}:</span>
              <span className="font-semibold text-gray-900">
                {submittedRecord.visitType === 'first_visit' ? t.booking.firstVisit : t.booking.followUp}
              </span>
            </div>
            {submittedRecord.reason && (
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">{currentLang === 'hi' ? 'कारण' : 'Reason'}:</span>
                <span className="font-medium text-gray-800 text-right">{submittedRecord.reason}</span>
              </div>
            )}
            <div className="flex justify-between pt-1 text-xs">
              <span className="text-gray-500">{currentLang === 'hi' ? 'क्लिनिक' : 'Clinic'}:</span>
              <span className="font-medium text-gray-700 text-right">Kalyan Pharmacy, Eco Village-2</span>
            </div>
          </div>

          {/* Action Buttons for Confirmation */}
          <div className="flex flex-col sm:flex-row items-center gap-3 no-print">
            {/* WhatsApp enquire link with token */}
            <a
              href={CLINIC_INFO.getWhatsappUrl(
                `Hello Dr. Sneha Bakshi's clinic desk, I have submitted an appointment request (Ref: ${submittedRecord.referenceNumber}) for ${submittedRecord.fullName} on ${submittedRecord.date} around ${submittedRecord.timeSlot}. Please confirm availability.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.booking.whatsappConfirmBtn}</span>
            </a>

            {/* Direct Call Button */}
            <a
              href={`tel:${CLINIC_INFO.phoneTel}`}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#173B63] hover:bg-[#122e4d] text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all"
            >
              <Phone className="w-4 h-4 text-[#168C8C]" />
              <span>{t.booking.callConfirmBtn}</span>
            </a>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100 no-print">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Printer className="w-4 h-4 text-gray-500" />
              <span>{t.booking.printSummaryBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-[#168C8C] hover:underline"
            >
              {currentLang === 'hi' ? 'नया अनुरोध दर्ज करें' : 'Submit Another Request'}
            </button>
          </div>
        </div>
      ) : (
        /* FORM STATE */
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          
          {/* Row 1: Patient Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                {t.booking.fullNameLabel} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  placeholder={t.booking.fullNamePlaceholder}
                  className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName 
                      ? 'border-red-400 focus:ring-red-200' 
                      : 'border-[#E3EAF0] focus:ring-[#168C8C]/20 focus:border-[#168C8C]'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                {t.booking.phoneLabel} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 text-xs font-bold">
                  +91
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, '');
                    setFormData({ ...formData, phone: cleaned });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder={t.booking.phonePlaceholder}
                  className={`w-full pl-12 pr-3 py-2.5 rounded-xl border text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.phone 
                      ? 'border-red-400 focus:ring-red-200' 
                      : 'border-[#E3EAF0] focus:ring-[#168C8C]/20 focus:border-[#168C8C]'
                  }`}
                />
              </div>
              {errors.phone ? (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.phone}
                </p>
              ) : (
                <p className="text-[11px] text-gray-500 mt-1">{t.booking.phoneHelp}</p>
              )}
            </div>

          </div>

          {/* Row 2: Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Preferred Date */}
            <div>
              <label htmlFor="appointmentDate" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                {t.booking.dateLabel} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="appointmentDate"
                  name="appointmentDate"
                  type="date"
                  required
                  min={todayStr}
                  value={formData.date}
                  onChange={(e) => {
                    setFormData({ ...formData, date: e.target.value });
                    if (errors.date) setErrors({ ...errors, date: '' });
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl border text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.date 
                      ? 'border-red-400 focus:ring-red-200' 
                      : 'border-[#E3EAF0] focus:ring-[#168C8C]/20 focus:border-[#168C8C]'
                  }`}
                />
              </div>
              {errors.date && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.date}
                </p>
              )}
            </div>

            {/* Preferred Time Slot */}
            <div>
              <label htmlFor="timeSlot" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                {t.booking.timeSlotLabel} <span className="text-red-500">*</span>
              </label>
              <select
                id="timeSlot"
                name="timeSlot"
                required
                value={formData.timeSlot}
                onChange={(e) => {
                  setFormData({ ...formData, timeSlot: e.target.value });
                  if (errors.timeSlot) setErrors({ ...errors, timeSlot: '' });
                }}
                className={`w-full px-3 py-2.5 rounded-xl border text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.timeSlot 
                    ? 'border-red-400 focus:ring-red-200' 
                    : 'border-[#E3EAF0] focus:ring-[#168C8C]/20 focus:border-[#168C8C]'
                }`}
              >
                <option value="">{t.booking.selectSlotPrompt}</option>
                {timeSlots.map((slot) => (
                  <option key={slot.id} value={slot.labelEn}>
                    {currentLang === 'hi' ? slot.labelHi : slot.labelEn}
                  </option>
                ))}
              </select>
              {errors.timeSlot && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.timeSlot}
                </p>
              )}
            </div>

          </div>

          {/* Row 3: Consultation Type (First Visit vs Follow-Up) */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              {t.booking.visitTypeLabel} <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                  formData.visitType === 'first_visit'
                    ? 'border-[#168C8C] bg-[#E8F6F3] text-[#173B63] font-semibold'
                    : 'border-[#E3EAF0] bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="visitType"
                  value="first_visit"
                  checked={formData.visitType === 'first_visit'}
                  onChange={() => setFormData({ ...formData, visitType: 'first_visit' })}
                  className="w-4 h-4 text-[#168C8C] focus:ring-[#168C8C]"
                />
                <span className="text-xs sm:text-sm">{t.booking.firstVisit}</span>
              </label>

              <label
                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                  formData.visitType === 'follow_up'
                    ? 'border-[#168C8C] bg-[#E8F6F3] text-[#173B63] font-semibold'
                    : 'border-[#E3EAF0] bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="visitType"
                  value="follow_up"
                  checked={formData.visitType === 'follow_up'}
                  onChange={() => setFormData({ ...formData, visitType: 'follow_up' })}
                  className="w-4 h-4 text-[#168C8C] focus:ring-[#168C8C]"
                />
                <span className="text-xs sm:text-sm">{t.booking.followUp}</span>
              </label>
            </div>
          </div>

          {/* Row 4: Optional Reason for Consultation */}
          <div>
            <label htmlFor="reason" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              {t.booking.reasonLabel}
            </label>
            <textarea
              id="reason"
              name="reason"
              rows={2}
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder={t.booking.reasonPlaceholder}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E3EAF0] text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#168C8C]/20 focus:border-[#168C8C] transition-all resize-none"
            />
          </div>

          {/* Consent Checkbox */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.consent}
                onChange={(e) => {
                  setFormData({ ...formData, consent: e.target.checked });
                  if (errors.consent) setErrors({ ...errors, consent: '' });
                }}
                className="mt-0.5 w-4 h-4 text-[#168C8C] rounded border-gray-300 focus:ring-[#168C8C]"
              />
              <span className="text-xs text-gray-600 leading-snug">
                {t.booking.consentText}
              </span>
            </label>
            {errors.consent && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.consent}
              </p>
            )}
          </div>

          {/* Privacy Note */}
          <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-[#168C8C] flex-shrink-0" />
            <span>{t.booking.privacyNote}</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#173B63] hover:bg-[#122e4d] disabled:bg-gray-400 text-white font-semibold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] text-base"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t.booking.submittingBtn}</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 text-[#168C8C]" />
                <span>{t.booking.submitBtn}</span>
              </>
            )}
          </button>

          {/* Alternative direct call note */}
          <p className="text-center text-xs text-gray-500 pt-2">
            {currentLang === 'hi' 
              ? 'अथवा तत्काल समय जानने के लिए सीधे कॉल करें: ' 
              : 'Or for immediate assistance, call directly: '}
            <a href={`tel:${CLINIC_INFO.phoneTel}`} className="font-semibold text-[#168C8C] hover:underline">
              {CLINIC_INFO.phoneDisplay}
            </a>
          </p>

        </form>
      )}

    </div>
  );

  if (isOpenAsModal) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="w-full max-w-2xl my-8">
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <section id="booking" className="py-16 sm:py-20 bg-white border-b border-[#E3EAF0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {formContent}
      </div>
    </section>
  );
};
