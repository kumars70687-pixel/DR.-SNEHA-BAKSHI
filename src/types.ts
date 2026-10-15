export type Language = 'en' | 'hi';

export interface ServiceItem {
  id: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  iconName: string;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  date: string;
  timeSlot: string;
  visitType: 'first_visit' | 'follow_up';
  reason?: string;
  consent: boolean;
}

export interface AppointmentRequestRecord extends AppointmentFormData {
  id: string;
  referenceNumber: string;
  submittedAt: string;
  status: 'Pending Clinic Confirmation' | 'Under Review';
}

export interface ReviewTheme {
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  highlightTag: string;
}

export interface FaqItem {
  id: string;
  questionEn: string;
  questionHi: string;
  answerEn: string;
  answerHi: string;
}
