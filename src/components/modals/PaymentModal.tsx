import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, DollarSign, CreditCard, Wallet, CheckCircle2 } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  pairData: any;
}

export function PaymentModal({ isOpen, onClose, pairData }: PaymentModalProps) {
  const [amount, setAmount] = useState('');
  const [paymentType, setPaymentType] = useState('sena');
  const [paymentMethod, setPaymentMethod] = useState('transferencia');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    // Simulate API call
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setAmount('');
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-surface/95 backdrop-blur-xl w-full max-w-md rounded-2xl relative z-10 flex flex-col overflow-hidden max-h-[90vh] border border-outline-variant shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-outline-variant/60 bg-surface-container/50">
            <div>
              <h2 className="font-headline font-extrabold text-xl text-on-surface">Registrar Pago</h2>
              <p className="text-sm text-on-surface-variant mt-1">
                {pairData?.p1} y {pairData?.p2}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-surface-container-highest text-on-surface-variant transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 lg:p-6 overflow-y-auto custom-scrollbar space-y-6">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle2 size={32} />
                </motion.div>
                <h3 className="text-xl font-bold text-on-surface">¡Pago Registrado!</h3>
                <p className="text-on-surface-variant mt-2">El saldo ha sido actualizado correctamente.</p>
              </div>
            ) : (
              <>
                {/* Deuda Actual Info */}
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Deuda Actual</p>
                    <p className="text-2xl font-black text-rose-500">${pairData?.deuda?.toLocaleString() || 0}</p>
                  </div>
                  <Wallet className="text-rose-500 opacity-50" size={32} />
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
                    Monto a Pagar
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                    <input 
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-surface/50 dark:bg-surface-container-highest/30 border border-outline-variant dark:border-outline/20 rounded-xl pl-11 pr-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-lg"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Payment Type */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
                    Concepto
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentType('sena')}
                      className={`p-3 rounded-xl border font-bold text-sm transition-all ${
                        paymentType === 'sena' 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      Seña
                    </button>
                    <button
                      onClick={() => setPaymentType('sede')}
                      className={`p-3 rounded-xl border font-bold text-sm transition-all ${
                        paymentType === 'sede' 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      Sede (Saldo)
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
                    Método de Pago
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPaymentMethod('efectivo')}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        paymentMethod === 'efectivo' 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      <DollarSign size={18} />
                      <span className="text-[10px] font-bold uppercase">Efectivo</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('transferencia')}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        paymentMethod === 'transferencia' 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      <CreditCard size={18} />
                      <span className="text-[10px] font-bold uppercase">Transf.</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('mercadopago')}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        paymentMethod === 'mercadopago' 
                          ? 'border-primary bg-primary/10 text-primary' 
                          : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      <Wallet size={18} />
                      <span className="text-[10px] font-bold uppercase">MP</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {!isSuccess && (
            <div className="p-4 lg:p-6 border-t border-outline-variant/60 bg-surface-container/50 flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-outline-variant text-on-surface font-bold text-sm hover:bg-surface-container-highest/50 transition-all"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                disabled={!amount}
                className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm btn-primary-glow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Registrar Pago
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
