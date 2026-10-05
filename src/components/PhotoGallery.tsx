import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/menzelHabibData';
import { GalleryItem } from '../types/data';
import { MonographIllustration } from './MonographIllustrations';
import { Eye, X, ZoomIn, Info } from 'lucide-react';

export const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="py-14 bg-stone-100 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 mb-1">
              <span>التوثيق البصري والمشاهد</span>
              <span aria-hidden="true">·</span>
              <span>الملف المصور</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              المعرض الوثائقي المصور: وجوه وأرض وتراث منزل الحبيب
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-2xl leading-relaxed">
              مشاهد مرسومة وموثقة تجسد تضاريس خشم مريم، تقاليد الرعي والفروسية، نسيج الصوف والحلفاء، وسوق الماشية العريق.
            </p>
          </div>
          <span className="text-xs text-stone-500 font-medium bg-white px-3 py-1.5 rounded-lg border border-stone-200">
            6 لوحات توثيقية رئيسية
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Illustration Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-50 border-b border-stone-100">
                <MonographIllustration
                  type={item.svgType}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Hover overlay affordance */}
                <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white gap-2 text-xs font-medium">
                  <ZoomIn className="w-5 h-5 text-amber-300" />
                  <span>معاينة وتكبير الشرح</span>
                </div>

                <span className="absolute top-3 right-3 text-[11px] font-semibold bg-white/90 backdrop-blur-xs text-stone-800 px-2 py-0.5 rounded shadow-xs">
                  {item.category}
                </span>
              </div>

              {/* Card Text & Caption */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-serif text-stone-900 group-hover:text-amber-900 transition-colors mb-2">
                    {item.titleAr}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs text-amber-950 font-serif italic">
                  <Info className="w-3.5 h-3.5 text-amber-800 shrink-0 not-italic" />
                  <span className="truncate">{item.caption}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Zoomed View */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 relative flex flex-col max-h-[90vh]">
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 left-4 z-20 p-2 text-stone-600 hover:text-stone-950 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
                title="إغلاق المعاينة"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image Frame */}
              <div className="relative aspect-[16/9] w-full bg-stone-900">
                <MonographIllustration type={selectedPhoto.svgType} className="w-full h-full object-cover" />
                <div className="absolute bottom-3 right-3 bg-stone-900/80 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-md">
                  {selectedPhoto.category}
                </div>
              </div>

              {/* Detail Content */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-3">
                <h3 className="text-2xl font-serif font-bold text-stone-900">
                  {selectedPhoto.titleAr}
                </h3>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  {selectedPhoto.description}
                </p>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200/60 text-xs sm:text-sm text-amber-950 font-serif leading-relaxed">
                  <span className="font-bold block mb-1">الشرح التوثيقي:</span>
                  {selectedPhoto.caption}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
