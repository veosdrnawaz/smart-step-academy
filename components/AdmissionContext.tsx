import React, { createContext, useContext, useState, ReactNode } from 'react';
import AdmissionModal from './AdmissionModal';

interface AdmissionContextType {
  openModal: () => void;
  closeModal: () => void;
}

const AdmissionContext = createContext<AdmissionContextType | undefined>(undefined);

export const AdmissionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <AdmissionContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AdmissionModal isOpen={isOpen} onClose={closeModal} />
    </AdmissionContext.Provider>
  );
};

export const useAdmission = () => {
  const context = useContext(AdmissionContext);
  if (!context) {
    throw new Error('useAdmission must be used within an AdmissionProvider');
  }
  return context;
};
