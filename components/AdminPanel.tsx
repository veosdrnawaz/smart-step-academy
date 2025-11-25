
import React, { useState, useMemo, useEffect } from 'react';
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
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsAuthenticated(false);
      setPassword('');
      setStatus('idle');
    }
  }, [isOpen]);

  // --- STATISTICS CALCULATION ---
  const stats = useMemo(() => {
    if (!leads.length) return { total: 0, today: 0, topGrade: '-' };

    const total = leads.length;
    
    // Count Today's Leads
    const today = new Date().toDateString();
    const todayCount = leads.filter(l => {
      try {
        const d = new Date(l.timestamp);
        return d.toDateString() === today;
      } catch (e) { return false; }
    }).length;

    // Find Top Grade
    const grades = leads.map(l => l.grade || 'Unknown');
    const frequency: Record<string, number> = {};
    let maxFreq = 0;
    let mostFrequent = '-';

    grades.forEach(g => {
      frequency[g] = (frequency[g] || 0) + 1;
      if (frequency[g] > maxFreq) {
        maxFreq = frequency[g];
        mostFrequent = g;
      }
    });

    return { total, today: todayCount, topGrade: mostFrequent };
  }, [leads]);

  // --- LOGIN HANDLER ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: 'get_leads', password: password }),
      });
      
      const result = await response.json();
      
      if (result.status === 'success' && Array.isArray(result.data)) {
        // Filter out empty/invalid rows
        const cleanLeads = result.data.filter((l: Lead) => l.name && l.name !== 'N/A' && l.name.trim() !== '');
        setLeads(cleanLeads);
        setStatus('success');
        
        // Short delay to show success state before switching to dashboard
        setTimeout(() => {
            setIsAuthenticated(true);
            setStatus('idle');
        }, 800);
      } else {
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
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: 'get_leads', password: password }),
      });
      const result = await response.json();
      if (result.status === 'success' && Array.isArray(result.data)) {
        const cleanLeads = result.data.filter((l: Lead) => l.name && l.name !== 'N/A' && l.name.trim() !== '');
        setLeads(cleanLeads);
      }
    } catch(e) { console.error(e); }
    setStatus('idle');
  };

  const getWhatsAppLink = (lead: Lead) => {
    if (!lead.phone) return '#';
    let cleanNumber = lead.phone.replace(/\D/g, '');
    if (cleanNumber.startsWith('0')) cleanNumber = '92' + cleanNumber.substring(1);
    else if (!cleanNumber.startsWith('92')) cleanNumber = '92' + cleanNumber;

    const text = `Asalam-o-Alaikum ${lead.name}, received your inquiry for ${lead.grade}.`;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md" 
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`bg-dark border border-white/10 w-full rounded-2xl shadow-2xl overflow-hidden relative z-[10000] flex flex-col transition-all duration-500 ${isAuthenticated ? 'max-w-6xl h-[85vh]' : 'max-w-md h-auto'}`}
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          >
            {/* --- VIEW 1: LOGIN POPUP --- */}
            {!isAuthenticated ? (
               <div className="p-8 flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-2xl text-primary">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                  <h3 className="text-white font-bold text-2xl mb-2">Admin Access</h3>
                  <p className="text-muted text-sm mb-6 text-center">Enter your secure password to view the dashboard.</p>
                  
                  <form onSubmit={handleLogin} className="w-full space-y-4">
                    <div className="relative">
                        <i className="fa-solid fa-key absolute left-4 top-3.5 text-gray-500"></i>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-primary outline-none transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    {status === 'error' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                            Access Denied. Incorrect Password.
                        </motion.div>
                    )}

                    <button 
                      type="submit" 
                      disabled={status === 'loading' || status === 'success'}
                      className={`w-full font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${status === 'success' ? 'bg-green-500 text-white' : 'bg-primary text-dark hover:bg-secondary'}`}
                    >
                      {status === 'loading' ? (
                          <><i className="fa-solid fa-circle-notch fa-spin"></i> Verifying...</>
                      ) : status === 'success' ? (
                          <><i className="fa-solid fa-check"></i> Access Granted</>
                      ) : (
                          <>Login <i className="fa-solid fa-arrow-right"></i></>
                      )}
                    </button>
                  </form>
                  <button onClick={onClose} className="mt-6 text-muted hover:text-white text-sm cursor-pointer">Cancel</button>
               </div>
            ) : (
                /* --- VIEW 2: DASHBOARD POPUP --- */
                <>
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-card shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/20 p-2 rounded-lg">
                                <i className="fa-solid fa-chart-line text-primary"></i>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">Dashboard</h2>
                                <p className="text-xs text-muted">Real-time leads from Website</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={refreshData} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer" title="Refresh">
                                <i className={`fa-solid fa-rotate-right ${status === 'loading' ? 'fa-spin' : ''}`}></i>
                            </button>
                            <button onClick={onClose} className="p-2 text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                                <i className="fa-solid fa-times text-lg"></i>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto p-4 md:p-6 bg-dark">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-card border border-white/5 p-4 rounded-xl flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl"><i className="fa-solid fa-users"></i></div>
                                <div>
                                    <h4 className="text-muted text-xs uppercase font-bold">Total Leads</h4>
                                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                                </div>
                            </div>
                            <div className="bg-card border border-white/5 p-4 rounded-xl flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center text-xl"><i className="fa-solid fa-calendar-day"></i></div>
                                <div>
                                    <h4 className="text-muted text-xs uppercase font-bold">Today</h4>
                                    <p className="text-2xl font-bold text-white">{stats.today}</p>
                                </div>
                            </div>
                            <div className="bg-card border border-white/5 p-4 rounded-xl flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl"><i className="fa-solid fa-graduation-cap"></i></div>
                                <div>
                                    <h4 className="text-muted text-xs uppercase font-bold">Top Interest</h4>
                                    <p className="text-lg font-bold text-white truncate max-w-[120px]">{stats.topGrade}</p>
                                </div>
                            </div>
                        </div>

                        {/* Toolbar */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-white font-bold text-lg">Recent Inquiries</h3>
                            <a 
                                href="https://docs.google.com/spreadsheets/u/0/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <i className="fa-solid fa-table"></i> Open Sheet
                            </a>
                        </div>

                        {/* Data Table / Cards */}
                        <div className="bg-card/50 border border-white/10 rounded-xl overflow-hidden min-h-[300px]">
                             {/* Mobile Card View */}
                             <div className="md:hidden">
                                {leads.length === 0 ? (
                                     <div className="p-8 text-center text-muted">No data available yet.</div>
                                ) : (
                                    leads.map((lead, idx) => (
                                        <div key={idx} className="p-4 border-b border-white/5 last:border-0">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="text-white font-bold">{lead.name}</h4>
                                                    <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">{lead.grade}</span>
                                                </div>
                                                <span className="text-xs text-muted">
                                                    {lead.timestamp ? new Date(lead.timestamp).toLocaleDateString() : 'N/A'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted mb-3 line-clamp-2">"{lead.message}"</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-mono text-gray-400">{lead.phone}</span>
                                                <a href={getWhatsAppLink(lead)} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                                                    <i className="fa-brands fa-whatsapp"></i> Chat
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                )}
                             </div>

                             {/* Desktop Table View */}
                            <table className="w-full text-left text-sm text-gray-300 hidden md:table">
                                <thead className="bg-white/5 text-white uppercase text-xs font-bold">
                                    <tr>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Name</th>
                                        <th className="p-4">Grade/Class</th>
                                        <th className="p-4">Phone</th>
                                        <th className="p-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {leads.length === 0 ? (
                                        <tr><td colSpan={5} className="p-8 text-center text-muted">No data available yet.</td></tr>
                                    ) : (
                                        leads.map((lead, idx) => (
                                            <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                                <td className="p-4 whitespace-nowrap opacity-60">
                                                    {lead.timestamp ? new Date(lead.timestamp).toLocaleDateString() : 'N/A'}
                                                </td>
                                                <td className="p-4 font-semibold text-white">{lead.name}</td>
                                                <td className="p-4"><span className="bg-white/5 px-2 py-1 rounded text-xs">{lead.grade}</span></td>
                                                <td className="p-4 font-mono text-primary">{lead.phone}</td>
                                                <td className="p-4">
                                                    <a 
                                                        href={getWhatsAppLink(lead)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all opacity-80 group-hover:opacity-100"
                                                    >
                                                        <i className="fa-brands fa-whatsapp"></i> Chat
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdminPanel;
