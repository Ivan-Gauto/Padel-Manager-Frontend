import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DollarSign, PieChart as PieChartIcon, MapPin, Tag, Users, Search, Filter, Download, Banknote } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Tournament } from '../types';

interface TournamentAccountingProps {
  tournament: Tournament | null;
}

export function TournamentAccounting({ tournament }: TournamentAccountingProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const metrics = {
    esperado: 4880000,
    senas: 1590000,
    sede: 3010000,
    descuentos: 240000,
    adeudado: 0
  };

  const chartData = [
    { name: 'Esperado', value: metrics.esperado - metrics.senas - metrics.sede - metrics.descuentos, color: '#6366f1' },
    { name: 'Señas', value: metrics.senas, color: '#10b981' },
    { name: 'Sede', value: metrics.sede, color: '#3b82f6' },
    { name: 'Desc.', value: metrics.descuentos, color: '#f59e0b' },
    { name: 'Adeudado', value: metrics.adeudado, color: '#ef4444' },
  ];

  const tableData = [
    { id: '1', zona: 'B', pareja: { p1: 'Pacheco L.', p2: 'Ojeda N.' }, total: 80000, sena: 30000, desc: 0, sede: 50000, deuda: 0, estado: 'PAGADO' },
    { id: '2', zona: 'G', pareja: { p1: 'Aguirre J.', p2: 'Durán M.' }, total: 80000, sena: 30000, desc: 0, sede: 0, deuda: 50000, estado: 'SEÑARON' },
    { id: '3', zona: 'H', pareja: { p1: 'Kevin R.', p2: 'Gustavo R.' }, total: 80000, sena: 0, desc: 0, sede: 0, deuda: 80000, estado: 'DEUDA' },
    { id: '4', zona: 'D', pareja: { p1: 'Cesar Gauna', p2: '...' }, total: 80000, sena: 30000, desc: 0, sede: 50000, deuda: 0, estado: 'PAGADO' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Top Section: Metrics and Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Metrics Grid */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total Esperado */}
          <div className="glass-card p-6 rounded-2xl border border-outline-variant relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-4 right-4 opacity-10">
              <DollarSign size={48} />
            </div>
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Total Esperado</p>
            <h3 className="text-3xl font-black text-primary">
              {formatCurrency(metrics.esperado)}
            </h3>
          </div>

          {/* Recaudado (Señas) */}
          <div className="glass-card p-6 rounded-2xl border border-outline-variant relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-4 right-4 opacity-10">
              <PieChartIcon size={48} />
            </div>
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Recaudado (Señas)</p>
            <h3 className="text-3xl font-black text-secondary mb-2">
              {formatCurrency(metrics.senas)}
            </h3>
            <div className="space-y-1.5">
              <p className="text-[10px] text-on-surface-variant font-medium">32% del total esperado</p>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
          </div>

          {/* Recaudado (Sede) */}
          <div className="glass-card p-6 rounded-2xl border border-outline-variant relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-4 right-4 opacity-10">
              <MapPin size={48} />
            </div>
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Recaudado (Sede)</p>
            <h3 className="text-3xl font-black text-tertiary mb-2">
              {formatCurrency(metrics.sede)}
            </h3>
            <div className="space-y-1.5">
              <p className="text-[10px] text-on-surface-variant font-medium">62% del total esperado</p>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-tertiary rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
          </div>

          {/* Total Descuentos */}
          <div className="glass-card p-6 rounded-2xl border border-outline-variant relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-4 right-4 opacity-10">
              <Tag size={48} />
            </div>
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Total Descuentos</p>
            <h3 className="text-3xl font-black text-amber-500">
              {formatCurrency(metrics.descuentos)}
            </h3>
          </div>

          {/* Total Adeudado */}
          <div className="glass-card p-6 rounded-2xl border border-outline-variant relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-4 right-4 opacity-10">
              <Users size={48} />
            </div>
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">Total Adeudado</p>
            <h3 className="text-3xl font-black text-error">
              {formatCurrency(metrics.adeudado)}
            </h3>
          </div>
        </div>

        {/* Chart */}
        <div className="glass-card p-6 rounded-2xl border border-outline-variant flex flex-col">
          <h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Distribución de Ingresos</h3>
          <div className="flex-1 min-h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#1e1e2d', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
            {chartData.map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-[10px] text-on-surface-variant font-medium">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass-card p-4 rounded-2xl border border-outline-variant flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          <input 
            type="text"
            placeholder="Buscar por jugador, zona o categoría..."
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-2.5 pl-11 pr-4 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors flex items-center gap-2 text-sm font-bold">
            <Filter size={16} /> Filtros
          </button>
          <button className="px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors flex items-center gap-2 text-sm font-bold">
            <Download size={16} /> Exportar
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl border border-outline-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-surface-container-lowest/50 border-b border-outline-variant">
                <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Zona</th>
                <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Pareja</th>
                <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Total</th>
                <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Seña</th>
                <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Desc.</th>
                <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Sede</th>
                <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Deuda</th>
                <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Estado</th>
                <th className="p-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-surface-container-lowest/30 transition-colors">
                  <td className="p-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {row.zona}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-xs font-bold text-on-surface">{row.pareja.p1}</div>
                    <div className="text-xs font-bold text-on-surface">{row.pareja.p2}</div>
                  </td>
                  <td className="p-4 text-xs font-bold text-on-surface">{formatCurrency(row.total)}</td>
                  <td className="p-4 text-xs font-bold text-secondary">{formatCurrency(row.sena)}</td>
                  <td className="p-4 text-xs font-bold text-amber-500">{formatCurrency(row.desc)}</td>
                  <td className="p-4 text-xs font-bold text-tertiary">{formatCurrency(row.sede)}</td>
                  <td className="p-4 text-xs font-bold text-error">{formatCurrency(row.deuda)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider border ${
                      row.estado === 'PAGADO' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                      row.estado === 'SEÑARON' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-error/10 text-error border-error/20'
                    }`}>
                      {row.estado}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-1.5 rounded-lg bg-surface-container-highest text-primary hover:bg-primary/20 transition-colors inline-flex">
                      <Banknote size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
