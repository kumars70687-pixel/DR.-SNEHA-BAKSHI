import { createClient } from '@supabase/supabase-js';
import { AppointmentRequestRecord } from '../types';

const SUPABASE_PROJECT_ID = 'roqpvligxsgjzagcpitd';
const DEFAULT_SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
const DEFAULT_SUPABASE_KEY = 'sb_publishable_uzc_HksIrGdugi3Jh9QjLA_qtcWRku9';

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

export const SUPABASE_TABLE_SQL = `
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/roqpvligxsgjzagcpitd/sql)

create table if not exists appointments (
  id text primary key,
  reference_number text not null,
  full_name text not null,
  phone text not null,
  appointment_date text not null,
  time_slot text not null,
  visit_type text not null,
  reason text,
  consent boolean not null default true,
  status text not null default 'Pending Clinic Confirmation',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table appointments enable row level security;

-- Drop existing policies if any to prevent conflicts
drop policy if exists "Allow public to insert appointment requests" on appointments;
drop policy if exists "Allow public to read appointments" on appointments;
drop policy if exists "Allow public to update appointment status" on appointments;

-- Create policies for public clinic appointment requests
create policy "Allow public to insert appointment requests"
  on appointments for insert
  with check (true);

create policy "Allow public to read appointments"
  on appointments for select
  using (true);

create policy "Allow public to update appointment status"
  on appointments for update
  using (true);
`;

/**
 * Save an appointment record to Supabase, with automatic local fallback.
 */
export async function saveAppointment(record: AppointmentRequestRecord): Promise<{ success: boolean; error?: string; source: 'supabase' | 'local' }> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          id: record.id,
          reference_number: record.referenceNumber,
          full_name: record.fullName,
          phone: record.phone,
          appointment_date: record.date,
          time_slot: record.timeSlot,
          visit_type: record.visitType,
          reason: record.reason || null,
          consent: record.consent,
          status: record.status,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.warn('Supabase insert warning:', error.message);
      return { success: false, error: error.message, source: 'local' };
    }

    return { success: true, source: 'supabase' };
  } catch (err: any) {
    console.error('Supabase connection error:', err);
    return { success: false, error: err?.message || 'Network error', source: 'local' };
  }
}

/**
 * Fetch appointments from Supabase with fallback to localStorage.
 */
export async function fetchAppointments(): Promise<{ records: AppointmentRequestRecord[]; source: 'supabase' | 'local'; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error, using local fallback:', error.message);
      return { records: [], source: 'local', error: error.message };
    }

    if (data && Array.isArray(data)) {
      const records: AppointmentRequestRecord[] = data.map((item) => ({
        id: item.id || `req_${Date.now()}`,
        referenceNumber: item.reference_number,
        fullName: item.full_name,
        phone: item.phone,
        date: item.appointment_date,
        timeSlot: item.time_slot,
        visitType: item.visit_type as 'first_visit' | 'follow_up',
        reason: item.reason || '',
        consent: item.consent ?? true,
        status: item.status as any,
        submittedAt: new Date(item.created_at || Date.now()).toLocaleString()
      }));

      return { records, source: 'supabase' };
    }

    return { records: [], source: 'supabase' };
  } catch (err: any) {
    return { records: [], source: 'local', error: err?.message };
  }
}

/**
 * Update an appointment status in Supabase.
 */
export async function updateAppointmentStatus(id: string, status: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.warn('Supabase status update error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to update status in Supabase:', err);
    return false;
  }
}
