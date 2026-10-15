/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, AppointmentRequestRecord } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutDoctor } from './components/AboutDoctor';
import { ServicesSection } from './components/ServicesSection';
import { AppointmentBooking } from './components/AppointmentBooking';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { MyRequestsModal } from './components/MyRequestsModal';
import { AdminDeskModal } from './components/AdminDeskModal';
import { fetchAppointments } from './lib/supabase';

export default function App() {
  // Language State with persistence
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('sb_preferred_lang');
      return saved === 'hi' || saved === 'en' ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('sb_preferred_lang', lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  };

  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Appointment Requests State
  const [requests, setRequests] = useState<AppointmentRequestRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sb_appointment_requests');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Fetch appointments from Supabase on load
  useEffect(() => {
    fetchAppointments().then((res) => {
      if (res.records && res.records.length > 0) {
        setRequests((prev) => {
          const map = new Map<string, AppointmentRequestRecord>();
          res.records.forEach((r) => map.set(r.id, r));
          prev.forEach((r) => {
            if (!map.has(r.id)) map.set(r.id, r);
          });
          const merged = Array.from(map.values());
          try {
            localStorage.setItem('sb_appointment_requests', JSON.stringify(merged));
          } catch (e) {}
          return merged;
        });
      }
    }).catch((err) => {
      console.warn('Initial Supabase fetch skipped:', err);
    });
  }, []);

  const handleNewRequestCreated = (newReq: AppointmentRequestRecord) => {
    setRequests((prev) => [newReq, ...prev]);
  };

  const handleClearHistory = () => {
    setRequests([]);
    try {
      localStorage.removeItem('sb_appointment_requests');
    } catch (e) {
      console.warn('Storage clear error', e);
    }
  };

  // Modals & Navigation States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [requestsModalOpen, setRequestsModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState('');

  // Clinic Notice Board State (managed by clinic staff in AdminDeskModal)
  const [customNotice, setCustomNotice] = useState<string>(() => {
    try {
      return localStorage.getItem('sb_clinic_notice') || '';
    } catch {
      return '';
    }
  });

  const handleUpdateNotice = (notice: string) => {
    setCustomNotice(notice);
    try {
      localStorage.setItem('sb_clinic_notice', notice);
    } catch (e) {
      console.warn('Storage save notice error', e);
    }
  };

  const handleSelectServiceForBooking = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    // Smooth scroll to the in-page booking form or open modal if on mobile
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      setBookingModalOpen(true);
    }
  };

  const handleOpenBookingModal = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection && window.innerWidth >= 768) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      setBookingModalOpen(true);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#F7FAFC] text-[#172B3A] ${
      currentLang === 'hi' ? 'font-devanagari' : ''
    }`}>
      {/* 1. Header & Navigation */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenBooking={handleOpenBookingModal}
        onOpenRequestsList={() => setRequestsModalOpen(true)}
        requestCount={requests.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          currentLang={currentLang}
          onOpenBooking={handleOpenBookingModal}
        />

        {/* 3. About the Doctor Section */}
        <AboutDoctor
          currentLang={currentLang}
          onOpenBooking={handleOpenBookingModal}
          customNotice={customNotice}
          onOpenAdminModal={() => setAdminModalOpen(true)}
        />

        {/* 4. Medical Services Section */}
        <ServicesSection
          currentLang={currentLang}
          onSelectServiceForBooking={handleSelectServiceForBooking}
          onOpenBooking={handleOpenBookingModal}
        />

        {/* 5. Appointment Booking System (In-Page) */}
        <AppointmentBooking
          currentLang={currentLang}
          prefilledReason={prefilledService}
          onNewRequestCreated={handleNewRequestCreated}
        />

        {/* 6. Patient Reviews & Trust Section */}
        <ReviewsSection
          currentLang={currentLang}
        />

        {/* 7. Clinic Location & Google Maps Section */}
        <LocationSection
          currentLang={currentLang}
        />

        {/* 8. Frequently Asked Questions Section */}
        <FaqSection
          currentLang={currentLang}
        />
      </main>

      {/* 9. Footer */}
      <Footer
        currentLang={currentLang}
        onOpenBooking={handleOpenBookingModal}
        onOpenAdminModal={() => setAdminModalOpen(true)}
      />

      {/* 10. Floating Actions (WhatsApp & Quick Call) */}
      <FloatingActions
        currentLang={currentLang}
      />

      {/* Modal 1: Booking Modal (when triggered from mobile nav or floating buttons) */}
      {bookingModalOpen && (
        <AppointmentBooking
          currentLang={currentLang}
          isOpenAsModal={true}
          onCloseModal={() => {
            setBookingModalOpen(false);
            setPrefilledService('');
          }}
          prefilledReason={prefilledService}
          onNewRequestCreated={(newReq) => {
            handleNewRequestCreated(newReq);
          }}
        />
      )}

      {/* Modal 2: Patient's Saved Requests Modal */}
      {requestsModalOpen && (
        <MyRequestsModal
          currentLang={currentLang}
          requests={requests}
          onClose={() => setRequestsModalOpen(false)}
          onClearHistory={handleClearHistory}
        />
      )}

      {/* Modal 3: Clinic Desk & Administrator Portal */}
      {adminModalOpen && (
        <AdminDeskModal
          currentLang={currentLang}
          onClose={() => setAdminModalOpen(false)}
          customNotice={customNotice}
          onUpdateNotice={handleUpdateNotice}
          requests={requests}
          onUpdateRequests={setRequests}
        />
      )}
    </div>
  );
}
