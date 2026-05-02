import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Shield, Palette, Globe, HelpCircle, LogOut, ChevronRight, Camera } from 'lucide-react';
import { PreferenceModal } from '../components/modals/PreferenceModal';

interface SettingsProps {
  onLogout: () => void;
  setScreen: (screen: any) => void;
}

export function Settings({ onLogout, setScreen }: SettingsProps) {
  const [activePreference, setActivePreference] = useState<string | null>(null);

  const settingsOptions = [
    { id: 'security', icon: Shield, label: 'Seguridad y Privacidad', content: 'Configuración de seguridad y privacidad.' },
    { id: 'appearance', icon: Palette, label: 'Apariencia y Temas', content: 'Configuración de apariencia y temas.' },
    { id: 'language', icon: Globe, label: 'Idioma y Región', content: 'Configuración de idioma y región.' },
    { id: 'help', icon: HelpCircle, label: 'Centro de Ayuda', content: 'Centro de ayuda y soporte.' },
  ];

  const activeOption = settingsOptions.find(opt => opt.id === activePreference);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <section>
        <h1 className="font-headline font-extrabold text-3xl tracking-tight text-on-surface">Configuración</h1>
        <p className="text-on-surface-variant mt-1">Gestiona tu perfil, notificaciones y preferencias</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-surface/50 border border-outline-variant rounded-2xl p-6 shadow-sm">
            <h2 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
              <User size={22} className="text-primary" /> Perfil del Organizador
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant overflow-hidden border-4 border-outline/30 group-hover:border-primary transition-all">
                  <User size={48} />
                </div>
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-on-primary shadow-lg hover:scale-110 transition-transform">
                  <Camera size={16} />
                </button>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-on-surface">Juan Pérez</h3>
                <p className="text-on-surface-variant text-sm">Organizador Senior • Buenos Aires, AR</p>
              </div>
            </div>

            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-on-surface-variant uppercase ml-1">NOMBRE</label>
                <input className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" defaultValue="Juan" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-on-surface-variant uppercase ml-1">APELLIDO</label>
                <input className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" defaultValue="Pérez" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-on-surface-variant uppercase ml-1">EMAIL</label>
                <input className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" defaultValue="juan.perez@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold tracking-widest text-on-surface-variant uppercase ml-1">TELÉFONO</label>
                <input className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" defaultValue="+54 9 11 1234-5678" />
              </div>
              <div className="sm:col-span-2 pt-4">
                <button className="px-6 py-2.5 btn-primary-glow text-sm font-bold">Guardar Cambios</button>
              </div>
            </form>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-surface/50 border border-outline-variant rounded-2xl p-4 shadow-sm">
            <h2 className="font-headline font-bold text-lg mb-4 px-2">Preferencias</h2>
            <div className="space-y-1">
              {settingsOptions.map((item, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActivePreference(item.id)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-low text-on-surface-variant hover:text-primary transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </section>

          <section className="bg-surface/50 border border-primary/20 rounded-2xl p-4 shadow-sm">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-primary hover:bg-primary/10 transition-all font-bold"
            >
              <LogOut size={20} />
              <span className="text-sm">Cerrar Sesión</span>
            </button>
          </section>
        </div>
      </div>

      <PreferenceModal
        isOpen={!!activePreference}
        onClose={() => setActivePreference(null)}
        title={activeOption?.label || ''}
      >
        <p className="text-on-surface-variant">{activeOption?.content}</p>
      </PreferenceModal>
    </motion.div>
  );
}
