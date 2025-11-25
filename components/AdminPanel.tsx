
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GOOGLE_SCRIPT_URL } from '../config';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Lead {
  timestamp: string;
  name: string;
  grade: string;
  phone: string;
  message: string;
  source: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // 1. Authenticate & Fetch Data
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'get_leads', password: password }),
      });
      const result = await response.json();
      
      if (result.status === 'success') {
        setIsAuthenticated(true);
        // Basic client-side filtering to remove any remaining "bad" data from view
        const cleanLeads = result.data.filter((l: Lead) => l.name && l.name !== 'N/A' && l.name.trim() !== '');
        setLeads(cleanLeads);
        setStatus('idle');
      } else {
        // Show error in UI instead of alert for better mobile UX
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const refreshData = async () => {
    setStatus('loading');
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'get_leads', password: password }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        const cleanLeads = result.data.filter((l: Lead) => l.name && l.name !== 'N/A' && l.name.trim() !== '');
        setLeads(cleanLeads);
      }
    } catch(e) { console.error(e); }
    setStatus('idle');
  };

  // Helper to generate WhatsApp Link
  const getWhatsAppLink = (lead: Lead) => {
    if (!lead.phone) return '#';
    
    // 1. Clean number (remove non-digits)
    let cleanNumber = lead.phone.replace(/\D/g, '');
    
    // 2. Format for Pakistan (03... -> 923...)
    if (cleanNumber.startsWith('0')) {
        cleanNumber = '92' + cleanNumber.substring(1);
    } else if (!cleanNumber.startsWith('92')) {
        // Fallback if they just typed 3001234567
        cleanNumber = '92' + cleanNumber;
    }

    // 3. Create Message
    const text = `Asalam-o-Alaikum ${lead.name}, I received your inquiry at Smart Step Academy for Grade: ${lead.grade}. You provided the details: Name: ${lead.name}, Phone: ${lead.phone}. How can we assist you further?`;
    
    // 4. Return URL
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  // FIX: Do not return null early. Let AnimatePresence handle the conditional rendering.
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-dark border border-white/10 w-full max-w-6xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden relative z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-card">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-lock text-primary"></i> Admin Panel
              </h2>
              <button onClick={onClose} className="text-muted hover:text-white p-2">
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-auto p-6 bg-dark">
              {!isAuthenticated ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-gray-400">
                        <i className="fa-solid fa-user-shield"></i>
                      </div>
                      <h3 className="text-white font-bold text-xl">Admin Login</h3>
                    </div>
                    
                    <div className="space-y-2">
                      <input 
                        type="password" 
                        placeholder="Enter Password" 
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {status === 'error' && (
                        <p className="text-red-500 text-sm text-center">Invalid Password or Connection Error</p>
                      )}
                    </div>

                    <button 
                      type="submit" 
                      disabled={status === 'loading'}
                      className="w-full bg-primary text-dark font-bold py-3 rounded-lg hover:bg-secondary transition-colors"
                    >
                      {status === 'loading' ? 'Verifying...' : 'Login'}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h3 className="text-white font-bold">Recent Leads ({leads.length})</h3>
                    <div className="flex gap-3">
                        <a 
                            href="https://docs.google.com/spreadsheets/u/0/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm transition-colors border border-white/10"
                        >
                            <i className="fa-solid fa-table mr-2"></i> Open Database
                        </a>
                        <button onClick={refreshData} className="text-primary hover:text-white text-sm bg-primary/10 px-4 py-2 rounded-lg border border-primary/20">
                            <i className={`fa-solid fa-rotate-right ${status === 'loading' ? 'fa-spin' : ''} mr-1`}></i> Refresh
                        </button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto border border-white/10 rounded-lg bg-card/50">
                    <table className="w-full text-left text-sm text-gray-300 min-w-[800px]">
                      <thead className="bg-white/5 text-white uppercase text-xs font-bold">
                        <tr>
                          <th className="p-4">Date</th>
                          <th className="p-4">Name</th>
                          <th className="p-4">Grade</th>
                          <th className="p-4">Phone</th>
                          <th className="p-4">Message</th>
                          <th className="p-4">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {leads.length === 0 ? (
                           <tr>
                               <td colSpan={6} className="p-8 text-center text-muted">No valid leads found yet.</td>
                           </tr>
                        ) : (
                          leads.map((lead, idx) => (
                              <tr key={idx} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 whitespace-nowrap opacity-60">
                                  {new Date(lead.timestamp).toLocaleDateString()}
                                </td>
                                <td className="p-4 font-semibold text-white">{lead.name}</td>
                                <td className="p-4">{lead.grade}</td>
                                <td className="p-4 font-mono text-primary">{lead.phone}</td>
                                <td className="p-4 max-w-xs truncate" title={lead.message}>{lead.message || '-'}</td>
                                <td className="p-4">
                                  <a 
                                      href={getWhatsAppLink(lead)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-lg hover:shadow-green-500/20"
                                  >
                                      <i className="fa-brands fa-whatsapp text-sm"></i> Chat
                                  </a>
                                </td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdminPanel;
