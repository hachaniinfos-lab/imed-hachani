import React from 'react';
import { SECTORS_DATA } from '../data/menzelHabibData';
import { Sector } from '../types/data';
import { MapPin, Users, Layers, ArrowUpLeft } from 'lucide-react';

interface SectorsGridProps {
  onSelectSector: (sector: Sector) => void;
  selectedSectorId?: string | null;
}

export const SectorsGrid: React.FC<SectorsGridProps> = ({ onSelectSector, selectedSectorId }) => {
  return (
    <section id="sectors" className="py-12 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 mb-1">
              <span>التقسيم الترابي والإداري</span>
              <span aria-hidden="true">·</span>
              <span>بلدية ومعتمدية منزل الحبيب</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              العمادات الترابية السبع: تمايز جغرافي وتكامل تنموي
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-2xl leading-relaxed">
              تنتظم المعتمدية في سبع عمادات رئيسية تجمع بين المركز الحضري الخدماتي والمناطق الريفية الفلاحية والرعوية الشاسعة.
            </p>
          </div>
          <span className="text-xs text-stone-500 font-medium bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
            إجمالي 7 عمادات متصلة
          </span>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTORS_DATA.map((sec) => {
            const isSelected = selectedSectorId === sec.id;
            return (
              <div
                key={sec.id}
                className={`relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 ${
                  isSelected
                    ? 'border-amber-700 bg-amber-50/40 shadow-md ring-1 ring-amber-700'
                    : 'border-stone-200 bg-[#FAF8F5] hover:border-amber-300 hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Top metadata */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-semibold text-amber-900 bg-white px-2 py-0.5 rounded border border-stone-200">
                      {sec.type}
                    </span>
                    <span className="font-mono text-[11px] text-stone-400">
                      {sec.coordinates[0].toFixed(3)}°N, {sec.coordinates[1].toFixed(3)}°E
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-serif text-stone-900 mb-1">
                    {sec.nameAr}
                  </h3>
                  <p className="text-xs text-stone-400 font-sans tracking-wide mb-3">
                    {sec.nameFr}
                  </p>

                  {/* Quick Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className="bg-white p-2 rounded-lg border border-stone-200/70 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-stone-400 block leading-none">السكان المقدرون</span>
                        <span className="font-semibold text-stone-800">{sec.populationEstimate}</span>
                      </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-stone-200/70 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-stone-400 block leading-none">المساحة الجغرافية</span>
                        <span className="font-semibold text-stone-800">{sec.areaKm2}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {sec.description}
                  </p>

                  {/* Activities tags */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[11px] text-stone-400 font-medium block">أبرز الأنشطة والميزات:</span>
                    <div className="flex flex-wrap gap-1">
                      {sec.mainActivities.map((act, i) => (
                        <span key={i} className="text-[11px] bg-white text-stone-700 px-2 py-0.5 rounded border border-stone-200">
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-3 border-t border-stone-200/60 mt-2">
                  <button
                    onClick={() => onSelectSector(sec)}
                    className="w-full py-2 px-3 text-xs font-medium text-amber-950 bg-amber-100/80 hover:bg-amber-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-900" />
                    <span>تحديد وإظهار على الخارطة التفاعلية</span>
                    <ArrowUpLeft className="w-3 h-3 text-amber-800" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
