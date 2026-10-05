import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  DEMOGRAPHIC_EVOLUTION,
  AGE_DISTRIBUTION,
  ECONOMIC_ACTIVITIES,
  IMADA_DEMOGRAPHICS,
} from '../data/menzelHabibData';
import { Users, TrendingUp, Briefcase, PieChart as PieIcon, Layers, BarChart3, Info, Award } from 'lucide-react';

type ViewMode = 'all' | 'evolution' | 'age' | 'economy' | 'imadas';

export const DemographicCharts: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewMode>('all');
  const [activeEconomicIndex, setActiveEconomicIndex] = useState<number | null>(null);

  // Custom Tooltip for Recharts matching our archival theme
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-stone-900/95 text-stone-100 p-3 rounded-xl border border-stone-700 shadow-xl text-xs font-sans space-y-1 backdrop-blur-xs min-w-[140px]">
          <p className="font-bold text-amber-300 border-b border-stone-800 pb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex justify-between items-center gap-3">
              <span className="text-stone-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }}></span>
                {entry.name}:
              </span>
              <span className="font-mono font-bold text-white tabular-nums">
                {entry.value.toLocaleString()} {entry.unit || ''}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="demographics" className="py-14 bg-stone-50/70 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 mb-1">
              <span>المعطيات الإحصائية والديموغرافية</span>
              <span aria-hidden="true">·</span>
              <span>المعهد الوطني للإحصاء وتحيينات بلدية منزل الحبيب</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              التطور الديموغرافي والنسيج السوسيو-اقتصادي
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-2xl leading-relaxed">
              تحليل بياني معمق لتطور عدد السكان والأسر عبر التعدادات العامة، الهرم العمري، وتوزيع اليد العاملة النشيطة حسب القطاعات الإنتاجية.
            </p>
          </div>

          {/* KPI Mini Ribbons */}
          <div className="flex items-center gap-3 text-xs bg-white p-2.5 rounded-xl border border-stone-200 shadow-xs">
            <div className="text-right">
              <span className="text-stone-400 block text-[10px]">السكان (2024)</span>
              <span className="font-bold text-amber-950 font-mono text-sm tabular-nums">10,850 نسمة</span>
            </div>
            <div className="border-r border-stone-200 pr-3 text-right">
              <span className="text-stone-400 block text-[10px]">نسبة النشاط الفلاحي</span>
              <span className="font-bold text-emerald-800 font-mono text-sm tabular-nums">44.5%</span>
            </div>
            <div className="border-r border-stone-200 pr-3 text-right">
              <span className="text-stone-400 block text-[10px]">فئة الشباب (15-29)</span>
              <span className="font-bold text-blue-800 font-mono text-sm tabular-nums">24.2%</span>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8 border-b border-stone-200/80">
          {[
            { id: 'all', label: 'كافة المؤشرات والرسوم', icon: BarChart3 },
            { id: 'evolution', label: 'التطور السكاني (1994-2024)', icon: TrendingUp },
            { id: 'age', label: 'الهرم السكاني والفئات العمرية', icon: Users },
            { id: 'economy', label: 'النشاط الاقتصادي والتشغيل', icon: Briefcase },
            { id: 'imadas', label: 'توزيع السكان بالعمادات السبع', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as ViewMode)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? 'bg-amber-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/70 bg-white border border-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="space-y-8">
          
          {/* ROW 1: Evolution (AreaChart) + Age Pyramid (BarChart) */}
          {(activeView === 'all' || activeView === 'evolution' || activeView === 'age') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Chart 1: Population Evolution (7 cols on all/evolution view) */}
              {(activeView === 'all' || activeView === 'evolution') && (
                <div className={`${activeView === 'all' ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                      <span className="font-semibold text-amber-900">المسار الزمني الديموغرافي</span>
                      <span className="font-mono text-stone-400">1994 · 2004 · 2014 · 2024</span>
                    </div>
                    <h3 className="text-lg font-bold font-serif text-stone-900 mb-2">
                      تطور عدد السكان والأسر بمعتمدية منزل الحبيب
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed mb-6">
                      يبرز المنحنى مرحلة التراجع السكاني الخفيف بين 1994 و2014 نتيجة الهجرة الداخلية نحو المناطق الساحلية والصناعية بقابس وصفاقس، يعقبه تعافٍ ونمو مستقر مع ترقية المنطقة إلى بلدية وتوسيع المشاريع المحلية.
                    </p>

                    {/* Area Chart Container */}
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={DEMOGRAPHIC_EVOLUTION} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="popGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="5%" stopColor="#78350f" stopOpacity={0.65} />
                              <stop offset="95%" stopColor="#78350f" stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="houseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="5%" stopColor="#0284c7" stopOpacity={0.5} />
                              <stop offset="95%" stopColor="#0284c7" stopOpacity={0.05} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="year" stroke="#78716c" tick={{ fontSize: 12 }} />
                          <YAxis stroke="#78716c" tick={{ fontSize: 11 }} domain={[0, 13000]} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                          <Area
                            type="monotone"
                            dataKey="population"
                            name="إجمالي السكان (نسمة)"
                            stroke="#78350f"
                            strokeWidth={2.5}
                            fillOpacity={1}
                            fill="url(#popGrad)"
                          />
                          <Area
                            type="monotone"
                            dataKey="households"
                            name="عدد الأسر (أسرة)"
                            stroke="#0284c7"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#houseGrad)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Summary Footer on Evolution */}
                  <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-4 gap-2 text-center text-xs">
                    {DEMOGRAPHIC_EVOLUTION.map((item) => (
                      <div key={item.year} className="bg-stone-50 p-2 rounded-lg border border-stone-100">
                        <span className="text-stone-400 block text-[10px] font-mono">{item.year}</span>
                        <span className="font-bold text-stone-900 block font-mono tabular-nums">{item.population.toLocaleString()}</span>
                        <span className="text-[10px] text-stone-500">حجم الأسرة: {item.avgHouseholdSize}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chart 2: Age Pyramid & Groups (5 cols on all / full on age view) */}
              {(activeView === 'all' || activeView === 'age') && (
                <div className={`${activeView === 'all' ? 'lg:col-span-5' : 'lg:col-span-12'} bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                      <span className="font-semibold text-amber-900">الهيكل السكاني</span>
                      <span className="font-mono text-stone-400">توزيع الذكور والإناث</span>
                    </div>
                    <h3 className="text-lg font-bold font-serif text-stone-900 mb-2">
                      توزيع السكان حسب الفئات العمرية والجنس
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed mb-6">
                      طابع ديموغرافي فتي ومتوازن؛ حيث تمثل الفئات في سن النشاط الاقتصادي (15 - 59 سنة) أكثر من <strong className="text-stone-900">62.7%</strong> من إجمالي السكان، مما يمنح المعتمدية طاقة بشرية واعدة.
                    </p>

                    {/* Bar Chart Container */}
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={AGE_DISTRIBUTION} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="group" stroke="#78716c" tick={{ fontSize: 11 }} />
                          <YAxis stroke="#78716c" tick={{ fontSize: 11 }} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                          <Bar dataKey="males" name="ذكور" fill="#0369a1" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="females" name="إناث" fill="#b45309" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Age groups distribution pill bar */}
                  <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5 text-xs">
                    {AGE_DISTRIBUTION.map((ag) => (
                      <div key={ag.group} className="flex items-center justify-between bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-100">
                        <span className="text-stone-700 font-medium">{ag.group} ({ag.category})</span>
                        <div className="flex items-center gap-2 font-mono text-stone-800">
                          <span className="font-bold">{ag.percentage}%</span>
                          <span className="text-stone-400 text-[10px]">({ag.total.toLocaleString()} نسمة)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ROW 2: Economic Activity (Pie/Donut + Detail cards) */}
          {(activeView === 'all' || activeView === 'economy') && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 mb-1">
                    <span>البنية الاقتصادية والتشغيل</span>
                    <span aria-hidden="true">·</span>
                    <span>توزيع السكان النشيطين المشتغلين</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
                    توزيع السكان النشيطين حسب قطاعات النشاط الاقتصادي
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                    تهيمن الفلاحة والتربية الرعوية كأول مشغل لأهالي المعتمدية بنسبة <strong className="text-amber-900">44.5%</strong>، تليها الخدمات العمومية والتعليم والصحة، مع نمو قطاع الطاقة الشمسية المستقبلي.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Donut Chart (5 cols) */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ECONOMIC_ACTIVITIES}
                          dataKey="percentage"
                          nameKey="sector"
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={105}
                          paddingAngle={3}
                          onMouseEnter={(_, index) => setActiveEconomicIndex(index)}
                        >
                          {ECONOMIC_ACTIVITIES.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                              stroke="#ffffff"
                              strokeWidth={2}
                              style={{
                                filter: activeEconomicIndex === index ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))' : 'none',
                                cursor: 'pointer',
                              }}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value: any, name: any) => [`${value}% من اليد العاملة`, name]}
                          contentStyle={{
                            backgroundColor: '#1c1917',
                            borderColor: '#44403c',
                            borderRadius: '10px',
                            color: '#fff',
                            fontSize: '12px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <span className="text-[11px] text-stone-400 text-center block mt-1">
                    * مرر المؤشر أو انقر على القطاع لإبراز تفاصيل الوظائف والمشتغلين
                  </span>
                </div>

                {/* Sector Cards (7 cols) */}
                <div className="lg:col-span-7 space-y-2.5">
                  {ECONOMIC_ACTIVITIES.map((item, idx) => {
                    const isHovered = activeEconomicIndex === idx;
                    return (
                      <div
                        key={item.sector}
                        onMouseEnter={() => setActiveEconomicIndex(idx)}
                        onMouseLeave={() => setActiveEconomicIndex(null)}
                        className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                          isHovered
                            ? 'bg-amber-50/70 border-amber-500 shadow-sm translate-x-1'
                            : 'bg-stone-50 border-stone-200/80 hover:bg-stone-100/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                            <h4 className="text-sm font-bold text-stone-900">{item.sector}</h4>
                          </div>
                          <div className="flex items-baseline gap-2 font-mono">
                            <span className="text-base font-bold text-stone-900 tabular-nums">{item.percentage}%</span>
                            <span className="text-xs text-stone-400">({item.workers} مشتغل)</span>
                          </div>
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed mb-2">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {item.keyJobs.map((job, jIdx) => (
                            <span key={jIdx} className="text-[10px] bg-white text-stone-700 px-2 py-0.5 rounded border border-stone-200">
                              {job}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          )}

          {/* ROW 3: Sector Distribution across Imadas (BarChart) */}
          {(activeView === 'all' || activeView === 'imadas') && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 mb-1">
                    <span>التوازن الترابي والسكاني</span>
                    <span aria-hidden="true">·</span>
                    <span>العمادات السبع لمعتمدية منزل الحبيب</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
                    التوزيع السكاني التقديري حسب العمادات السبع (2024)
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                    يستأثر المركز الإداري والحضري بـ <strong className="text-stone-900">29.5%</strong> من السكان، بينما يتوزع بقية الأهالي عبر 6 عمادات ريفية فلاحية ورعوية بمعدلات متوازنة تعزز الاستقرار في الأرياف.
                  </p>
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={IMADA_DEMOGRAPHICS} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#78716c" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" />
                    <YAxis stroke="#78716c" tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(value: any, name: any) => [`${value.toLocaleString()} نسمة`, 'السكان المقدرون']}
                      contentStyle={{
                        backgroundColor: '#1c1917',
                        borderColor: '#44403c',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="population" name="السكان (نسمة)" fill="#78350f" radius={[6, 6, 0, 0]}>
                      {IMADA_DEMOGRAPHICS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#9a3412' : '#b45309'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Imadas Demographic Table */}
              <div className="mt-6 pt-4 border-t border-stone-200 overflow-x-auto">
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-500 bg-stone-50">
                      <th className="py-2.5 px-3 font-semibold">العمادة الترابية</th>
                      <th className="py-2.5 px-3 font-semibold">التصنيف الوظيفي</th>
                      <th className="py-2.5 px-3 font-semibold">السكان (2024)</th>
                      <th className="py-2.5 px-3 font-semibold">النسبة المئوية</th>
                      <th className="py-2.5 px-3 font-semibold">عدد الأسر المقدر</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono text-stone-700">
                    {IMADA_DEMOGRAPHICS.map((im) => (
                      <tr key={im.name} className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-2 px-3 font-sans font-bold text-stone-900">{im.name}</td>
                        <td className="py-2 px-3 font-sans text-stone-500">{im.type}</td>
                        <td className="py-2 px-3 font-bold text-amber-950 tabular-nums">{im.population.toLocaleString()} نسمة</td>
                        <td className="py-2 px-3 tabular-nums">{im.percentage}%</td>
                        <td className="py-2 px-3 tabular-nums">{im.households} أسرة</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Demographic Analytical Insights (4 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs mb-3">
                01
              </span>
              <h4 className="text-sm font-bold font-serif text-stone-900 mb-1">
                مجتمع فتي وطاقة عمل واعدة
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                يمثل الأطفال والشباب دون 30 سنة نحو <strong className="text-stone-800">48%</strong> من السكان، مما يشكل فرصة ديموغرافية هامة لتنشيط قطاعات الإنتاج والتحول الطاقي.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xs mb-3">
                02
              </span>
              <h4 className="text-sm font-bold font-serif text-stone-900 mb-1">
                الارتباط بالأرض والمحيط الرعوي
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                تعتبر تربية الماشية وغراسات الزيتون نمط عيش وهوية، حيث تستوعب الفلاحة ما يقارب نصف القوى العاملة، ما يمنح الاقتصاد المحلي صلابة أمام الأزمات.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs mb-3">
                03
              </span>
              <h4 className="text-sm font-bold font-serif text-stone-900 mb-1">
                تراجع حجم الأسرة التونسية
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                انخفض متوسط عدد أفراد الأسرة من <strong className="text-stone-800">5.8 أفراد</strong> عام 1994 إلى <strong className="text-stone-800">4.0 أفراد</strong> عام 2024، تماشياً مع التحول الديموغرافي الوطني.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs">
              <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-xs mb-3">
                04
              </span>
              <h4 className="text-sm font-bold font-serif text-stone-900 mb-1">
                استقرار السكن بالأرياف
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                تساهم برامج تعبيد المسالك والآبار الشمسية وتوسيع خدمات البلدية في تثبيت السكان بأرياف وادي الزيتون، الفجيج، المهاملة، السقي، ربيعة والي، وزقراطة.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
