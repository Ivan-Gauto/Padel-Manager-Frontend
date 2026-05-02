import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  icon: React.ElementType;
  trendColor?: string;
}

export const StatCard = ({ title, value, trend, icon: Icon, trendColor }: StatCardProps) => (
  <div className="glass-card p-4 lg:p-6 rounded-xl relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-3 lg:p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon size={64} className="lg:size-[72px]" />
    </div>
    <p className="text-[9px] lg:text-[10px] uppercase tracking-widest text-on-surface font-bold mb-1 lg:mb-2">{title}</p>
    <div className="flex items-end gap-2">
      <span className="text-2xl lg:text-4xl font-headline font-extrabold">{value}</span>
      {trend && (
        <span className={`${trendColor} text-xs lg:text-sm mb-0.5 lg:mb-1 font-semibold`}>{trend}</span>
      )}
    </div>
  </div>
);
