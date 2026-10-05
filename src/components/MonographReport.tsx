import React from 'react';
import { MONOGRAPH_SECTIONS } from '../data/menzelHabibData';
import { BookOpen, Compass, Award, ExternalLink, Bookmark } from 'lucide-react';

export const MonographReport: React.FC = () => {
  return (
    <article id="monograph-text" className="py-16 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Curatorial Header */}
        <div className="border-b-2 border-stone-900 pb-6 mb-12 text-center md:text-right">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans mb-3">
            <span>المرجع المونوغرافي الميداني · المجلد الأول</span>
            <span>توثيق جغرافي واقتصادي واجتماعي</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 leading-tight">
            مونوغرافيا معتمدية منزل الحبيب: الإنسان، الأرض، والمصير التنموي
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-serif italic mt-3 max-w-3xl">
            دراسة ميدانية توثيقية ترصد المقومات الطبيعية والتحولات السوسيو-اقتصادية في أقصى الشمال الغربي لولاية قابس.
          </p>

          <div className="flex items-center gap-3 text-xs text-stone-400 mt-4 border-t border-stone-200 pt-3">
            <span>إعداد وتوثيق: الفريق البحثي والتوثيقي</span>
            <span aria-hidden="true">·</span>
            <span>المصادر: المعهد الوطني للإحصاء، المندوبية الجهوية للتنمية الفلاحية، بلدية منزل الحبيب</span>
          </div>
        </div>

        {/* Monograph Chapters */}
        <div className="space-y-16">
          {MONOGRAPH_SECTIONS.map((sec, idx) => (
            <section key={sec.id} className="relative">
              {/* Chapter index badge */}
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 mb-2">
                <span className="font-mono">{`0${idx + 1}.`}</span>
                <span>{sec.subtitle}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-6">
                {sec.title}
              </h3>

              {/* Prose paragraphs with relaxed reading line-height */}
              <div className="space-y-5 text-stone-800 text-base sm:text-lg leading-[1.85] font-serif">
                {sec.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className={
                      pIdx === 0 && idx === 0
                        ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-right first-letter:ml-3 first-letter:mt-1 first-letter:text-amber-900'
                        : ''
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Editorial Pull Quote between sections */}
              {idx === 1 && (
                <figure className="my-10 p-6 bg-white rounded-2xl border-r-4 border-amber-800 border border-stone-200/80 shadow-xs">
                  <blockquote className="text-lg sm:text-xl font-serif italic text-stone-900 leading-relaxed">
                    «يمثل جبل خشم مريم بوصلة الذاكرة البصرية في منزل الحبيب؛ فمن فوق قمته المطلة، تلتقي مسارات القوافل التاريخية مع سهول الحلفاء التي صمدت في وجه التصحر لمئات السنين.»
                  </blockquote>
                  <figcaption className="text-xs text-stone-500 font-sans not-italic mt-3">
                    — من مذكرات استكشاف الجنوب الشرقي التونسي
                  </figcaption>
                </figure>
              )}

              {idx === 3 && (
                <div className="my-10 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
                  <h4 className="text-base font-bold font-serif text-stone-900 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-800" />
                    <span>جدول مقارن: مكانة منزل الحبيب ضمن معتمديات ولاية قابس</span>
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-right border-collapse">
                      <thead>
                        <tr className="border-b border-stone-200 text-stone-500">
                          <th className="py-2 px-3 font-semibold">المؤشر التنموي</th>
                          <th className="py-2 px-3 font-semibold text-amber-950 bg-amber-50">معتمدية منزل الحبيب</th>
                          <th className="py-2 px-3 font-semibold">معتمدية الحامة</th>
                          <th className="py-2 px-3 font-semibold">المعدل الجهوي لولاية قابس</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 font-mono text-stone-700">
                        <tr>
                          <td className="py-2.5 px-3 font-sans font-medium text-stone-900">المساحة الجملية (كم²)</td>
                          <td className="py-2.5 px-3 font-bold text-amber-950 bg-amber-50/60 tabular-nums">1,020 كم²</td>
                          <td className="py-2.5 px-3 tabular-nums">1,211 كم²</td>
                          <td className="py-2.5 px-3 tabular-nums">560 كم² (متوسط)</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-sans font-medium text-stone-900">القطيع الرعوي (أغنام وماعز)</td>
                          <td className="py-2.5 px-3 font-bold text-amber-950 bg-amber-50/60 tabular-nums">+75,000 رأس</td>
                          <td className="py-2.5 px-3 tabular-nums">~60,000 رأس</td>
                          <td className="py-2.5 px-3 tabular-nums">35,000 رأس</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-sans font-medium text-stone-900">ساعات السطوع الشمسي السنوي</td>
                          <td className="py-2.5 px-3 font-bold text-amber-950 bg-amber-50/60 tabular-nums">3,200 ساعة/سنة</td>
                          <td className="py-2.5 px-3 tabular-nums">3,150 ساعة/سنة</td>
                          <td className="py-2.5 px-3 tabular-nums">3,050 ساعة/سنة</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-sans font-medium text-stone-900">النمط الفلاحي السائد</td>
                          <td className="py-2.5 px-3 font-sans text-stone-900 bg-amber-50/60">رعوي سهبي + زيتون بعلي</td>
                          <td className="py-2.5 px-3 font-sans text-stone-900">واحي جيوحراري + بواكير</td>
                          <td className="py-2.5 px-3 font-sans text-stone-900">واحي وبحري وصناعي</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Archival Citations & Methodology */}
        <div className="mt-16 pt-8 border-t border-stone-300 text-xs text-stone-500 space-y-2 font-sans">
          <div className="flex items-center gap-1.5 font-bold text-stone-700">
            <Bookmark className="w-3.5 h-3.5 text-amber-800" />
            <span>المراجع والهوامش التوثيقية المعتمدة:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-stone-600 leading-relaxed pr-2">
            <li>المعهد الوطني للإحصاء (تونس) - التعداد العام للسكان والسكنى، معطيات ولاية قابس ومعتمدياتها.</li>
            <li>المندوبية الجهوية للتنمية الفلاحية بقابس - تقرير المؤشرات الفلاحية والرعوية وحوض مياه الأعشاب السهبية.</li>
            <li>بلدية منزل الحبيب - وثائق مخطط الاستثمار البلدي التشاركي ومشاريع البنية الأساسية.</li>
            <li>وزارة الصناعة والمناجم والطاقة - إستراتيجية الانتقال الطاقي والمواقع المؤهلة للمحطات الفولطوضوئية بالجنوب التونسي.</li>
          </ol>
        </div>

      </div>
    </article>
  );
};
