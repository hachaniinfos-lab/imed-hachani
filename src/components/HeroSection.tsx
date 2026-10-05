import React from 'react';
import { MONOGRAPH_METRICS } from '../data/menzelHabibData';
import { MonographIllustration } from './MonographIllustrations';
import { Map, Share2, Compass, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onOpenBloggerModal: () => void;
  onExploreMap: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBloggerModal, onExploreMap }) => {
  return (
    <section id="overview" className="pt-8 pb-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curatorial Header Lockup */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
            <span>الجمهورية التونسية</span>
            <span aria-hidden="true">·</span>
            <span>ولاية قابس</span>
            <span aria-hidden="true">·</span>
            <span>المونوغرافيا الميدانية الشاملة</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 leading-tight text-balance">
            معتمدية منزل الحبيب: بوابة قابس الغربية وموطن السهوب والأصالة
          </h1>

          <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            دليل ومرجع وثائقي مصور يستعرض الخصائص الجغرافية، التقسيم الإداري للعمادات، الثروة الحيوانية والفلاحية، جبل خشم مريم، وتطلعات التحول الطاقي النظيف، مع خارطة تفاعلية وأداة مخصصة للنشر في مدونات <span className="font-semibold text-amber-900">Blogger</span>.
          </p>

          {/* Jump Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onExploreMap}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-amber-900 hover:bg-amber-800 rounded-xl shadow-sm transition-all hover:shadow-md"
            >
              <Map className="w-4 h-4" />
              <span>استكشاف الخارطة التفاعلية</span>
            </button>

            <button
              onClick={onOpenBloggerModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-stone-800 bg-white hover:bg-stone-50 rounded-xl border border-stone-300 shadow-xs transition-colors"
            >
              <Share2 className="w-4 h-4 text-amber-800" />
              <span>أخذ كود النشر لمدونة Blogger</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Monument Banner */}
        <div className="mt-10 relative rounded-2xl overflow-hidden border border-stone-200 shadow-md aspect-[16/9] max-h-[500px] w-full bg-amber-50">
          <MonographIllustration type="landscape" className="w-full h-full object-cover" />
          
          {/* Subtle Curatorial Inscription Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-amber-300 block mb-1">
                لوحة المشهد الطبوغرافي
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
                سهوب منزل الحبيب وسلسلة جبل خشم مريم في الأفق الغربي
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed line-clamp-2 sm:line-clamp-none">
                تمتد سهول المعتمدية على رقعة تفوق الألف كيلومتر مربع، حيث تتضافر غابات الزيتون البعلية ومراعي الحلفاء مع شموخ المرتفعات الكلسية لتصنع هوية بيئية متفردة.
              </p>
            </div>
          </div>
        </div>

        {/* Monograph Metrics Grid */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {MONOGRAPH_METRICS.map((metric, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs hover:border-amber-300 transition-colors">
              <span className="text-xs text-stone-500 block mb-1 font-medium leading-snug">{metric.label}</span>
              <div className="flex items-baseline gap-1 text-stone-900 font-serif font-bold text-xl sm:text-2xl font-mono tabular-nums">
                <span>{metric.value}</span>
                {metric.unit && <span className="text-xs font-sans font-normal text-stone-500">{metric.unit}</span>}
              </div>
              <p className="text-[11px] text-stone-400 mt-1 leading-tight">{metric.subtext}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
