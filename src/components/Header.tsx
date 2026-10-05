import React from 'react';
import { Share2, Printer, Map, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenBloggerModal: () => void;
  onPrintReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBloggerModal, onPrintReport }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight hover:text-amber-900 transition-colors">
          معتمدية منزل الحبيب
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-5 text-xs lg:text-sm font-medium text-stone-600">
          <a href="#overview" className="hover:text-amber-900 transition-colors whitespace-nowrap">نظرة عامة</a>
          <a href="#interactive-map" className="hover:text-amber-900 transition-colors whitespace-nowrap">الخارطة التفاعلية</a>
          <a href="#sectors" className="hover:text-amber-900 transition-colors whitespace-nowrap">العمادات</a>
          <a href="#demographics" className="hover:text-amber-900 transition-colors whitespace-nowrap">الديموغرافيا</a>
          <a href="#weather" className="hover:text-amber-900 transition-colors whitespace-nowrap text-amber-900 font-semibold">الطقس والمناخ</a>
          <a href="#monograph-text" className="hidden lg:inline hover:text-amber-900 transition-colors whitespace-nowrap">التقرير التوثيقي</a>
          <a href="#gallery" className="hidden xl:inline hover:text-amber-900 transition-colors whitespace-nowrap">المعرض المصور</a>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onPrintReport}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap"
            title="طباعة التقرير المونوغرافي أو حفظه PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة التقرير</span>
          </button>

          <button
            onClick={onOpenBloggerModal}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-amber-900 hover:bg-amber-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            title="تضمين التقرير والخارطة التفاعلية في مدونة Blogger"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>إضافة إلى مدونة Blogger</span>
          </button>
        </div>

      </div>
    </header>
  );
};
