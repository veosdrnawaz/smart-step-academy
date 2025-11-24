
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
        setLeads(result.data);
        setStatus('idle');
      } else {
        alert('Invalid Password');
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      alert('Connection Failed');
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
        setLeads(result.data);
      }
    } catch(e) { console.error(e); }
    setStatus('idle');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-dark border border-white/10 w-full max-w-4xl h-[80vh] rounded-2xl shadow-2xl overflow-hidden relative z-[101] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-card">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <i className="fa-solid fa-lock text-primary"></i> Admin Panel
            </h2>
            <button onClick={onClose} className="text-muted hover:text-white">
              <i className="fa-solid fa-times text-xl"></i>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-auto p-6">
            {!isAuthenticated ? (
              <div className="flex flex-col items-center justify-center h-full">
                <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-gray-400">
                      <i className="fa-solid fa-user-shield"></i>
                    </div>
                    <h3 className="text-white font-bold text-xl">Admin Login</h3>
                  </div>
                  <input 
                    type="password" 
                    placeholder="Enter Password" 
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
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
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-bold">Recent Leads ({leads.length})</h3>
                  <button onClick={refreshData} className="text-primary hover:text-white text-sm">
                    <i className={`fa-solid fa-rotate-right ${status === 'loading' ? 'fa-spin' : ''} mr-1`}></i> Refresh
                  </button>
                </div>
                
                <div className="overflow-auto border border-white/10 rounded-lg">
                  <table className="w-full text-left text-sm text-gray-300">
                    <thead className="bg-white/5 text-white uppercase text-xs font-bold">
                      <tr>
                        <th className="p-3">Date</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Grade</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Source</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {leads.map((lead, idx) => (
                        <tr key={idx} className="hover:bg-white/5">
                          <td className="p-3 whitespace-nowrap opacity-60">
                            {new Date(lead.timestamp).toLocaleDateString()}
                          </td>
                          <td className="p-3 font-semibold text-white">{lead.name}</td>
                          <td className="p-3">{lead.grade}</td>
                          <td className="p-3 font-mono text-primary">{lead.phone}</td>
                          <td className="p-3 text-xs">
                            <span className="bg-white/10 px-2 py-1 rounded">{lead.source}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminPanel;
