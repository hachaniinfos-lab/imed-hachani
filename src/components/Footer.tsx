import React from 'react';
import { Share2, MapPin, ExternalLink, Printer } from 'lucide-react';

interface FooterProps {
  onOpenBloggerModal: () => void;
  onPrintReport: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBloggerModal, onPrintReport }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-stone-800 text-sm">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xl font-serif font-bold text-white">
              معتمدية منزل الحبيب · ولاية قابس
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-md">
              تقرير مونوغرافي وثائقي وخارطة تفاعلية أُعد ليكون مرجعاً جغرافياً وإحصائياً وتنموياً شاملاً، ومهيأ للنشر والتضمين المباشر في مدونات Blogger والمنصات التعليمية والإخبارية.
            </p>
            <div className="text-xs text-amber-400/90 font-mono">
              34°11'43" N · 9°46'28" E · الرمز البريدي: 6034
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
              أقسام التقرير
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><a href="#overview" className="hover:text-amber-400 transition-colors">نظرة عامة ومؤشرات</a></li>
              <li><a href="#interactive-map" className="hover:text-amber-400 transition-colors">الخارطة الجغرافية التفاعلية</a></li>
              <li><a href="#sectors" className="hover:text-amber-400 transition-colors">العمادات الترابية الست</a></li>
              <li><a href="#demographics" className="hover:text-amber-400 transition-colors">الديموغرافيا وسوق العمل</a></li>
              <li><a href="#weather" className="hover:text-amber-400 transition-colors">الطقس والأرصاد المباشرة</a></li>
              <li><a href="#monograph-text" className="hover:text-amber-400 transition-colors">المونوغرافيا الميدانية والتاريخ</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">المعرض الوثائقي المصور</a></li>
            </ul>
          </div>

          {/* Col 3: Actions & Publishing */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
              النشر والأرشفة
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenBloggerModal}
                className="w-full text-right px-3 py-2 text-xs bg-amber-900/60 hover:bg-amber-800 text-amber-200 rounded-lg flex items-center justify-between transition-colors border border-amber-800/60"
              >
                <span>كود التضمين لمدونة Blogger</span>
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onPrintReport}
                className="w-full text-right px-3 py-2 text-xs bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg flex items-center justify-between transition-colors border border-stone-700"
              >
                <span>طباعة التقرير بصيغة PDF</span>
                <Printer className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} التقرير التوثيقي لمعتمدية منزل الحبيب - ولاية قابس، الجمهورية التونسية.</p>
          <div className="flex items-center gap-4">
            <span>مرجع جغرافي وثائقي</span>
            <span aria-hidden="true">·</span>
            <span>جاهز للنشر على BLOGGER</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
