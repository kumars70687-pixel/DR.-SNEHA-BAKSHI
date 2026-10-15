import React, { useState } from 'react';
import { 
  Building2, 
  X, 
  Bell, 
  Save, 
  Trash2, 
  Download, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  FileSpreadsheet,
  Database,
  RefreshCw,
  ExternalLink,
  Code,
  Copy,
  Check
} from 'lucide-react';
import { AppointmentRequestRecord, Language } from '../types';
import { CLINIC_INFO } from '../data/clinicData';
import { 
  fetchAppointments, 
  updateAppointmentStatus, 
  SUPABASE_TABLE_SQL, 
  SUPABASE_URL 
} from '../lib/supabase';

interface AdminDeskModalProps {
  currentLang: Language;
  onClose: () => void;
  customNotice: string;
  onUpdateNotice: (notice: string) => void;
  requests: AppointmentRequestRecord[];
  onUpdateRequests: (updated: AppointmentRequestRecord[]) => void;
}

export const AdminDeskModal: React.FC<AdminDeskModalProps> = ({
  currentLang,
  onClose,
  customNotice,
  onUpdateNotice,
  requests,
  onUpdateRequests
}) => {
  const [noticeDraft, setNoticeDraft] = useState(customNotice);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [showSqlSetup, setShowSqlSetup] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateNotice(noticeDraft);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleStatusChange = async (id: string, newStatus: AppointmentRequestRecord['status']) => {
    const updated = requests.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
    onUpdateRequests(updated);

    // Sync status change to Supabase
    try {
      await updateAppointmentStatus(id, newStatus);
    } catch (e) {
      console.warn('Could not sync status update to Supabase:', e);
    }
  };

  const handleSyncSupabase = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const result = await fetchAppointments();
      if (result.records && result.records.length > 0) {
        // Merge with existing
        const map = new Map<string, AppointmentRequestRecord>();
        result.records.forEach((r) => map.set(r.id, r));
        requests.forEach((r) => {
          if (!map.has(r.id)) map.set(r.id, r);
        });
        const merged = Array.from(map.values());
        onUpdateRequests(merged);
        setSyncMessage(`✓ Synced ${result.records.length} appointments from Supabase!`);
      } else if (result.error) {
        setSyncMessage(`Notice: Table 'appointments' might need creation in Supabase SQL editor.`);
      } else {
        setSyncMessage(`✓ Connected to Supabase. No new records found.`);
      }
    } catch (err: any) {
      setSyncMessage(`Sync notice: ${err?.message || 'Check database connection'}`);
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncMessage(null), 4000);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_TABLE_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleExportCSV = () => {
    if (requests.length === 0) return;
    const headers = ['Reference', 'Patient Name', 'Phone', 'Date', 'TimeSlot', 'VisitType', 'Reason', 'Status', 'SubmittedAt'];
    const rows = requests.map((r) => [
      `"${r.referenceNumber}"`,
      `"${r.fullName}"`,
      `"${r.phone}"`,
      `"${r.date}"`,
      `"${r.timeSlot}"`,
      `"${r.visitType}"`,
      `"${r.reason || ''}"`,
      `"${r.status}"`,
      `"${r.submittedAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clinic_appointments_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl border border-gray-100">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="w-11 h-11 rounded-xl bg-[#173B63] text-white flex items-center justify-center shadow-xs">
            <Building2 className="w-6 h-6 text-[#168C8C]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#173B63]">
              {currentLang === 'hi' ? 'क्लिनिक एडमिन / डेस्क पोर्टल' : 'Clinic Desk & Administrator Portal'}
            </h3>
            <p className="text-xs text-gray-500">
              Dr. Sneha Bakshi (MBBS) • Kalyan Pharmacy, Supertech Eco Village-2
            </p>
          </div>
        </div>

        {/* Supabase Database Connection Status Banner */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-emerald-950">
                    Supabase Database Connected
                  </h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-xs text-emerald-800 font-mono">
                  Project: roqpvligxsgjzagcpitd • Table: appointments
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSyncSupabase}
                disabled={isSyncing}
                className="inline-flex items-center gap-1.5 bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-900 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-emerald-600' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Supabase'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSqlSetup(!showSqlSetup)}
                className="inline-flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white px-2.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-colors"
                title="View table SQL schema"
              >
                <Code className="w-3.5 h-3.5" />
                <span>SQL Setup</span>
              </button>
            </div>
          </div>

          {syncMessage && (
            <p className="mt-2 text-xs font-medium text-emerald-800 bg-white/70 p-2 rounded-lg border border-emerald-200 animate-fadeIn">
              {syncMessage}
            </p>
          )}

          {/* Collapsible SQL Setup instructions */}
          {showSqlSetup && (
            <div className="mt-4 pt-3 border-t border-emerald-200/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-950">
                  Supabase Table Creation SQL Script:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopySql}
                    className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-bold underline"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Script'}</span>
                  </button>
                  <a
                    href="https://supabase.com/dashboard/project/roqpvligxsgjzagcpitd/sql/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-bold underline ml-2"
                  >
                    <span>Open Supabase SQL Editor</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <p className="text-emerald-800">
                If your Supabase project does not have the <code>appointments</code> table yet, copy this SQL and run it in your Supabase SQL editor:
              </p>
              <pre className="bg-gray-900 text-emerald-300 p-3 rounded-xl overflow-x-auto text-[11px] font-mono max-h-48 border border-gray-700">
                {SUPABASE_TABLE_SQL.trim()}
              </pre>
            </div>
          )}
        </div>

        {/* Notice Board Management */}
        <div className="bg-[#F7FAFC] rounded-2xl p-5 border border-[#E3EAF0] mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#168C8C]" />
              <h4 className="font-bold text-sm text-[#173B63]">
                {currentLang === 'hi' ? 'दैनिक क्लिनिक सूचना बोर्ड (Today’s Notice)' : 'Clinic Announcement / Notice Banner'}
              </h4>
            </div>
            {saveSuccess && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-bold animate-fadeIn">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Saved
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 mb-3">
            {currentLang === 'hi'
              ? 'यहाँ आप क्लिनिक की ताज़ा सूचना (जैसे अवकाश, विशेष समय, या परामर्श संबंधी घोषणा) सेट कर सकते हैं जो मरीजों को वेबसाइट पर दिखेगी।'
              : 'Post a real-time notice for visitors (e.g. holiday notice, revised evening hours, or vaccination availability).'}
          </p>

          <form onSubmit={handleSaveNotice} className="space-y-3">
            <textarea
              rows={2}
              value={noticeDraft}
              onChange={(e) => setNoticeDraft(e.target.value)}
              placeholder="e.g. Regular evening OPD is active today from 5:00 PM to 8:30 PM. Please bring past medical records."
              className="w-full p-3 rounded-xl border border-[#E3EAF0] text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#168C8C]/20 focus:border-[#168C8C] resize-none"
            />
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setNoticeDraft('');
                  onUpdateNotice('');
                }}
                className="text-xs text-gray-500 hover:text-red-600 transition-colors"
              >
                Clear Notice
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 bg-[#173B63] hover:bg-[#122e4d] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all"
              >
                <Save className="w-3.5 h-3.5 text-[#168C8C]" />
                <span>Save Notice</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Appointment Enquiries Table */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h4 className="font-bold text-base text-[#173B63]">
                {currentLang === 'hi' ? 'प्राप्त अपॉइंटमेंट अनुरोध' : 'Received Appointment Requests'}
              </h4>
              <p className="text-xs text-gray-500">
                {requests.length} {currentLang === 'hi' ? 'अनुरोध रिकॉर्ड' : 'record(s) recorded'}
              </p>
            </div>

            {requests.length > 0 && (
              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 bg-white border border-[#168C8C] text-[#173B63] hover:bg-[#E8F6F3] px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#168C8C]" />
                <span>Export CSV</span>
              </button>
            )}
          </div>

          {requests.length === 0 ? (
            <div className="text-center py-8 bg-[#F7FAFC] rounded-2xl border border-dashed border-gray-300 text-gray-500 text-xs">
              No patient appointment requests recorded yet. Submissions from the appointment form will appear here and in your Supabase database.
            </div>
          ) : (
            <div className="border border-[#E3EAF0] rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#173B63] text-white uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Ref Token</th>
                      <th className="py-3 px-4">Patient</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Slot</th>
                      <th className="py-3 px-4">Status & Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {requests.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#173B63] whitespace-nowrap">
                          {r.referenceNumber}
                        </td>
                        <td className="py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">
                          {r.fullName}
                          <span className="block text-[10px] text-gray-400 font-normal">
                            {r.visitType === 'first_visit' ? 'New Visit' : 'Follow-up'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                          <a href={`tel:+91${r.phone}`} className="hover:underline text-[#168C8C] font-semibold">
                            +91 {r.phone}
                          </a>
                        </td>
                        <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                          <div className="font-medium text-gray-800">{r.date}</div>
                          <div className="text-[10px] text-gray-400">{r.timeSlot}</div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <select
                            value={r.status}
                            onChange={(e) => handleStatusChange(r.id, e.target.value as any)}
                            className="bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-lg px-2 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          >
                            <option value="Pending Clinic Confirmation">Pending Confirmation</option>
                            <option value="Confirmed by Phone">Confirmed by Phone</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Supabase URL: {SUPABASE_URL}</span>
          <button
            type="button"
            onClick={onClose}
            className="bg-[#173B63] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#122e4d]"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};
