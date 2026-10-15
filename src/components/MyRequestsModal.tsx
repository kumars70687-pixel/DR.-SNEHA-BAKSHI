import React from 'react';
import { 
  Clock, 
  X, 
  Calendar, 
  Phone, 
  FileText, 
  MessageSquare, 
  CheckCircle,
  Copy,
  Printer
} from 'lucide-react';
import { AppointmentRequestRecord, Language } from '../types';
import { CLINIC_INFO } from '../data/clinicData';

interface MyRequestsModalProps {
  currentLang: Language;
  requests: AppointmentRequestRecord[];
  onClose: () => void;
  onClearHistory: () => void;
}

export const MyRequestsModal: React.FC<MyRequestsModalProps> = ({
  currentLang,
  requests,
  onClose,
  onClearHistory
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto relative shadow-2xl">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#E8F6F3] text-[#168C8C] flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#173B63]">
              {currentLang === 'hi' ? 'मेरे अपॉइंटमेंट अनुरोध' : 'My Appointment Enquiries'}
            </h3>
            <p className="text-xs text-gray-500">
              {currentLang === 'hi' 
                ? 'आपके इस डिवाइस पर स्थानीय रूप से सुरक्षित अनुरोध' 
                : 'Requests recorded locally on this device'}
            </p>
          </div>
        </div>

        {/* Content */}
        {requests.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm">
              {currentLang === 'hi' ? 'कोई सक्रिय अनुरोध नहीं मिला।' : 'No appointment requests found yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="p-5 rounded-2xl bg-[#F7FAFC] border border-[#E3EAF0] space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-2.5">
                  <span className="font-mono font-bold text-sm text-[#173B63]">
                    {req.referenceNumber}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {req.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500 block">Patient:</span>
                    <span className="font-semibold text-gray-900">{req.fullName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Date & Slot:</span>
                    <span className="font-semibold text-gray-900">{req.date} ({req.timeSlot})</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Phone:</span>
                    <span className="font-semibold text-gray-900">+91 {req.phone}</span>
                  </div>
                </div>

                {req.reason && (
                  <p className="text-xs text-gray-600 bg-white p-2 rounded-lg border border-gray-100">
                    <span className="font-medium text-gray-700">Reason: </span>
                    {req.reason}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-200 text-xs">
                  <span className="text-gray-400 text-[11px]">Submitted: {req.submittedAt}</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={CLINIC_INFO.getWhatsappUrl(
                        `Hi, enquiry regarding my booking ${req.referenceNumber} for Dr. Sneha Bakshi on ${req.date}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#25D366] hover:underline font-semibold"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Clinic</span>
                    </a>
                    <span>•</span>
                    <a
                      href={`tel:${CLINIC_INFO.phoneTel}`}
                      className="inline-flex items-center gap-1 text-[#173B63] hover:underline font-semibold"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#168C8C]" />
                      <span>Call Desk</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClearHistory}
                className="text-xs text-red-600 hover:text-red-800 hover:underline"
              >
                {currentLang === 'hi' ? 'इतिहास साफ करें' : 'Clear Request History'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#173B63] text-white px-5 py-2 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
