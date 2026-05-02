import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Calendar, User, Camera } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function ProfileModal({ isOpen, onClose, onLogout }: ProfileModalProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-surface/95 backdrop-blur-xl w-full max-w-md rounded-2xl p-8 relative z-10 border border-outline-variant shadow-2xl"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant overflow-hidden border-4 border-outline/30 group-hover:border-primary transition-all">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} />
                  )}
                </div>
                <button 
                  onClick={handleImageClick}
                  className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-on-primary shadow-lg hover:scale-110 transition-transform"
                >
                  <Camera size={16} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
              <div>
                <h2 className="font-headline font-extrabold text-2xl text-on-surface">Juan Delgado</h2>
                <p className="text-primary font-bold text-sm">Organizador de Torneos</p>
              </div>
              
              <div className="w-full space-y-3 pt-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-surface/50 border border-outline-variant">
                  <Mail className="text-on-surface-variant" size={20} />
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Email</p>
                    <p className="text-sm font-medium">juan.delgado@padel.pro</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-surface/50 border border-outline-variant">
                  <Calendar className="text-on-surface-variant" size={20} />
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Miembro desde</p>
                    <p className="text-sm font-medium">Octubre 2023</p>
                  </div>
                </div>
              </div>

              <div className="w-full pt-6 flex gap-3">
                <button 
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border border-outline-variant text-on-surface font-bold text-sm hover:bg-surface-container-highest/50 transition-all"
                >
                  Cerrar
                </button>
                <button 
                  onClick={onLogout}
                  className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm btn-primary-glow"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
