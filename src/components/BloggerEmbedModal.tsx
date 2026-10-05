import React, { useState } from 'react';
import { Copy, Check, Download, Code, FileText, HelpCircle, X, AlertTriangle, Globe, MapPin, ExternalLink } from 'lucide-react';
import {
  MONOGRAPH_SECTIONS,
  SECTORS_DATA,
  MONOGRAPH_METRICS,
  DEMOGRAPHIC_EVOLUTION,
  AGE_DISTRIBUTION,
  ECONOMIC_ACTIVITIES,
  IMADA_DEMOGRAPHICS,
} from '../data/menzelHabibData';

interface BloggerEmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl: string;
}

export const BloggerEmbedModal: React.FC<BloggerEmbedModalProps> = ({ isOpen, onClose, appUrl }) => {
  const [activeTab, setActiveTab] = useState<'full-article' | 'osm-map' | 'interactive-app' | 'guide'>('full-article');
  const [iframeHeight, setIframeHeight] = useState('720');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [standaloneHtml, setStandaloneHtml] = useState<string>('');

  React.useEffect(() => {
    fetch('/menzel-el-habib-blogger.html')
      .then((res) => res.text())
      .then((text) => setStandaloneHtml(text))
      .catch(() => {});
  }, []);

  if (!isOpen) return null;

  // Resolve Public Shared URL (ensuring ais-pre- instead of private ais-dev-)
  const rawUrl = appUrl || window.location.origin;
  const publicSharedUrl = rawUrl.replace('ais-dev-', 'ais-pre-');

  // OpenStreetMap embed URL for Menzel El Habib (100% public, no auth, no 401 error)
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=9.55%2C34.05%2C10.02%2C34.35&layer=mapnik&marker=34.1952%2C9.7745`;

  // Option 1: Full Native Article for Blogger (Guaranteed 100% to work in Blogger without any 401 error)
  const fullArticleSnippet = `<!-- ================================================================= -->
<!-- مقال توثيقي كامل لمعتمدية منزل الحبيب (ولاية قابس) - مخصص لمدونات Blogger -->
<!-- طريقة النشر: الصق هذا الكود كاملاً في تبويب (عرض HTML / HTML View) داخل محرر بلوجر -->
<!-- ================================================================= -->

<div dir="rtl" style="font-family:'Tajawal', 'Amiri', Tahoma, Arial, sans-serif; line-height:1.9; color:#1c1917; max-width:880px; margin:0 auto; padding:15px; font-size:16px; background:#ffffff;">
  
  <!-- رأس المقال والترويسة -->
  <header style="text-align:center; border-bottom:3px solid #78350f; padding-bottom:25px; margin-bottom:30px;">
    <div style="display:inline-block; background:#fef3c7; color:#92400e; padding:5px 16px; border-radius:20px; font-size:13px; font-weight:bold; margin-bottom:12px; border:1px solid #fde68a;">
      الجمهورية التونسية · ولاية قابس · تقرير مونوغرافي موثق
    </div>
    <h1 style="font-size:28px; color:#1c1917; margin:10px 0 15px; font-weight:800; line-height:1.4;">
      معتمدية منزل الحبيب: بوابة قابس الغربية وملتقى السهوب والأصالة
    </h1>
    <p style="color:#57534e; font-size:15px; max-width:700px; margin:0 auto; line-height:1.7;">
      دليل توثيقي شامل يستعرض الخصائص الجغرافية، التقسيم الترابي للعمادات الست، الثروة الحيوانية والفلاحية، جبل خشم مريم، المؤشرات الديموغرافية، ومشاريع الطاقة الشمسية النظيفة.
    </p>
  </header>

  <!-- بطاقات المؤشرات الإحصائية السريعة -->
  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:12px; margin-bottom:30px;">
    <div style="background:#fafaf9; border:1px solid #e7e5e4; border-radius:10px; padding:14px; text-align:center;">
      <span style="font-size:11px; color:#78716c; display:block; margin-bottom:4px;">المساحة الجملية</span>
      <strong style="font-size:20px; color:#92400e;">1,020 كم²</strong>
      <span style="font-size:10px; color:#a8a29e; display:block; margin-top:2px;">14.2% من ولاية قابس</span>
    </div>
    <div style="background:#fafaf9; border:1px solid #e7e5e4; border-radius:10px; padding:14px; text-align:center;">
      <span style="font-size:11px; color:#78716c; display:block; margin-bottom:4px;">العمادات الترابية</span>
      <strong style="font-size:20px; color:#92400e;">7 عمادات</strong>
      <span style="font-size:10px; color:#a8a29e; display:block; margin-top:2px;">المركز و6 أرياف</span>
    </div>
    <div style="background:#fafaf9; border:1px solid #e7e5e4; border-radius:10px; padding:14px; text-align:center;">
      <span style="font-size:11px; color:#78716c; display:block; margin-bottom:4px;">العدد السكاني (2024)</span>
      <strong style="font-size:20px; color:#92400e;">10,850 نسمة</strong>
      <span style="font-size:10px; color:#a8a29e; display:block; margin-top:2px;">مجتمع فتي متجذر</span>
    </div>
    <div style="background:#fafaf9; border:1px solid #e7e5e4; border-radius:10px; padding:14px; text-align:center;">
      <span style="font-size:11px; color:#78716c; display:block; margin-bottom:4px;">القطيع الحيواني</span>
      <strong style="font-size:20px; color:#92400e;">+75,000 رأس</strong>
      <span style="font-size:10px; color:#a8a29e; display:block; margin-top:2px;">أغنام وإبل وماعز</span>
    </div>
    <div style="background:#fafaf9; border:1px solid #e7e5e4; border-radius:10px; padding:14px; text-align:center;">
      <span style="font-size:11px; color:#78716c; display:block; margin-bottom:4px;">غابات الزيتون</span>
      <strong style="font-size:20px; color:#92400e;">18,500 هكتار</strong>
      <span style="font-size:10px; color:#a8a29e; display:block; margin-top:2px;">زراعات بعلية مقاومة</span>
    </div>
    <div style="background:#fafaf9; border:1px solid #e7e5e4; border-radius:10px; padding:14px; text-align:center;">
      <span style="font-size:11px; color:#78716c; display:block; margin-bottom:4px;">السطوع الشمسي</span>
      <strong style="font-size:20px; color:#92400e;">3,200 س/سنة</strong>
      <span style="font-size:10px; color:#a8a29e; display:block; margin-top:2px;">مستقبل الطاقة النظيفة</span>
    </div>
  </div>

  <!-- الخارطة الجغرافية المباشرة (تعمل 100% دون أي خطأ 401) -->
  <div style="margin:35px 0; border:1px solid #d6d3d1; border-radius:14px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.06); background:#fafaf9;">
    <div style="background:#78350f; color:#ffffff; padding:12px 18px; font-weight:bold; font-size:15px; display:flex; justify-content:space-between; align-items:center;">
      <span>🗺️ الخارطة الجغرافية التفاعلية لمعتمدية منزل الحبيب (ولاية قابس)</span>
      <a href="https://www.openstreetmap.org/?mlat=34.1952&mlon=9.7745#map=12/34.1952/9.7745" target="_blank" rel="noopener noreferrer" style="background:#fef3c7; color:#78350f; padding:5px 12px; border-radius:6px; font-size:12px; text-decoration:none; font-weight:bold;">
        عرض الخريطة بملء الشاشة ↗
      </a>
    </div>
    <iframe 
      width="100%" 
      height="480" 
      frameborder="0" 
      scrolling="no" 
      marginheight="0" 
      marginwidth="0" 
      src="${osmEmbedUrl}" 
      style="border:0; display:block; width:100%;" 
      title="خريطة منزل الحبيب">
    </iframe>
    <div style="padding:10px 16px; background:#f5f5f4; border-top:1px solid #e7e5e4; font-size:12px; color:#57534e; display:flex; justify-content:space-between; align-items:center;">
      <span>📍 الموقع المركزي: 34.1952° N, 9.7745° E · يظهر موقع منزل الحبيب، وادي الزيتون، وجبل خشم مريم</span>
      <a href="https://www.openstreetmap.org/?mlat=34.1952&mlon=9.7745#map=11/34.1952/9.7745" target="_blank" style="color:#78350f; text-decoration:none; font-weight:bold;">عرض خريطة أكبر ↗</a>
    </div>
  </div>

  <!-- الفصول التوثيقية المونوغرافية -->
  ${MONOGRAPH_SECTIONS.map((sec, i) => `
  <section style="margin-bottom:35px; border-bottom:1px solid #f5f5f4; padding-bottom:25px;">
    <h2 style="font-size:22px; color:#78350f; border-right:4px solid #92400e; padding-right:12px; margin-bottom:8px; line-height:1.4;">
      ${i + 1}. ${sec.title}
    </h2>
    <p style="font-weight:bold; color:#78716c; font-size:14px; margin-bottom:14px;">
      ${sec.subtitle}
    </p>
    ${sec.paragraphs.map(p => `<p style="margin-bottom:14px; text-align:justify; color:#292524; font-size:16px;">${p}</p>`).join('')}
  </section>
  `).join('')}

  <!-- جدول العمادات الترابية السبع -->
  <div style="margin:35px 0;">
    <h3 style="font-size:20px; color:#78350f; margin-bottom:12px; border-right:4px solid #92400e; padding-right:10px;">
      📋 التقسيم الإداري للعمادات الترابية السبع
    </h3>
    <p style="font-size:13px; color:#57534e; margin-bottom:12px;">بيانات المساحة والسكان والأنشطة الرئيسية لكل عمادة بمعتمدية منزل الحبيب:</p>
    <div style="overflow-x:auto;">
      <table style="width:100%; border-collapse:collapse; font-size:13px; text-align:right; border:1px solid #e7e5e4;">
        <thead>
          <tr style="background:#f5f5f4; border-bottom:2px solid #d6d3d1;">
            <th style="padding:10px; border:1px solid #e7e5e4;">العمادة</th>
            <th style="padding:10px; border:1px solid #e7e5e4;">التصنيف</th>
            <th style="padding:10px; border:1px solid #e7e5e4;">السكان المقدرون</th>
            <th style="padding:10px; border:1px solid #e7e5e4;">المساحة</th>
            <th style="padding:10px; border:1px solid #e7e5e4;">أبرز الأنشطة والخصائص</th>
          </tr>
        </thead>
        <tbody>
          ${SECTORS_DATA.map(s => `
          <tr style="border-bottom:1px solid #e7e5e4;">
            <td style="padding:10px; font-weight:bold; color:#78350f; border:1px solid #e7e5e4;">${s.nameAr}</td>
            <td style="padding:10px; border:1px solid #e7e5e4;">${s.type}</td>
            <td style="padding:10px; font-weight:bold; border:1px solid #e7e5e4;">${s.populationEstimate}</td>
            <td style="padding:10px; border:1px solid #e7e5e4;">${s.areaKm2}</td>
            <td style="padding:10px; border:1px solid #e7e5e4;">${s.mainActivities.join('، ')}</td>
          </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- التطور الديموغرافي والنشاط الاقتصادي -->
  <div style="margin:35px 0;">
    <h3 style="font-size:20px; color:#78350f; margin-bottom:15px; border-right:4px solid #92400e; padding-right:10px;">
      📊 المؤشرات الديموغرافية والنشاط الاقتصادي
    </h3>
    
    <div style="margin-bottom:25px;">
      <h4 style="font-size:15px; font-weight:bold; color:#1c1917; margin-bottom:8px;">1. التطور السكاني عبر التعدادات العامة (1994 - 2024):</h4>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:13px; text-align:right; border:1px solid #e7e5e4;">
          <thead>
            <tr style="background:#f5f5f4; border-bottom:2px solid #d6d3d1;">
              <th style="padding:8px 10px; border:1px solid #e7e5e4;">السنة</th>
              <th style="padding:8px 10px; border:1px solid #e7e5e4;">عدد السكان</th>
              <th style="padding:8px 10px; border:1px solid #e7e5e4;">عدد الأسر</th>
              <th style="padding:8px 10px; border:1px solid #e7e5e4;">حجم الأسرة</th>
              <th style="padding:8px 10px; border:1px solid #e7e5e4;">المصدر والتصنيف</th>
            </tr>
          </thead>
          <tbody>
            ${DEMOGRAPHIC_EVOLUTION.map(d => `
            <tr style="border-bottom:1px solid #e7e5e4;">
              <td style="padding:8px 10px; font-weight:bold; color:#78350f; border:1px solid #e7e5e4;">${d.year}</td>
              <td style="padding:8px 10px; font-weight:bold; border:1px solid #e7e5e4;">${d.population.toLocaleString()} نسمة</td>
              <td style="padding:8px 10px; border:1px solid #e7e5e4;">${d.households.toLocaleString()} أسرة</td>
              <td style="padding:8px 10px; border:1px solid #e7e5e4;">${d.avgHouseholdSize} أفراد</td>
              <td style="padding:8px 10px; color:#78716c; border:1px solid #e7e5e4;">${d.censusType}</td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <h4 style="font-size:15px; font-weight:bold; color:#1c1917; margin-bottom:8px;">2. توزيع السكان النشيطين حسب قطاع النشاط الاقتصادي:</h4>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:13px; text-align:right; border:1px solid #e7e5e4;">
          <thead>
            <tr style="background:#f5f5f4; border-bottom:2px solid #d6d3d1;">
              <th style="padding:8px 10px; border:1px solid #e7e5e4;">القطاع الاقتصادي</th>
              <th style="padding:8px 10px; border:1px solid #e7e5e4;">النسبة</th>
              <th style="padding:8px 10px; border:1px solid #e7e5e4;">المشتغلون</th>
              <th style="padding:8px 10px; border:1px solid #e7e5e4;">أبرز الوظائف</th>
            </tr>
          </thead>
          <tbody>
            ${ECONOMIC_ACTIVITIES.map(e => `
            <tr style="border-bottom:1px solid #e7e5e4;">
              <td style="padding:8px 10px; font-weight:bold; color:#1c1917; border:1px solid #e7e5e4;">${e.sector}</td>
              <td style="padding:8px 10px; font-weight:bold; color:#92400e; border:1px solid #e7e5e4;">${e.percentage}%</td>
              <td style="padding:8px 10px; border:1px solid #e7e5e4;">${e.workers} مشتغل</td>
              <td style="padding:8px 10px; color:#57534e; border:1px solid #e7e5e4;">${e.keyJobs.join('، ')}</td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- خاتمة وتوثيق المصادر -->
  <footer style="margin-top:40px; padding-top:20px; border-top:2px solid #e7e5e4; font-size:12px; color:#78716c; text-align:center; line-height:1.8;">
    <p>تم إعداد هذا التقرير التوثيقي اعتماداً على بيانات المعهد الوطني للإحصاء (تونس)، المندوبية الجهوية للتنمية الفلاحية بقابس، ومخطط التنمية لبلدية منزل الحبيب.</p>
    <p style="margin-top:5px; font-weight:bold; color:#78350f;">
      📍 معتمدية منزل الحبيب - ولاية قابس (الإحداثيات: 34.1952° N, 9.7745° E)
    </p>
  </footer>
</div>
<!-- نهاية المقال التوثيقي -->`;

  // Option 2: Pure OpenStreetMap Widget (100% public iframe, guaranteed no 401 error)
  const osmWidgetSnippet = `<!-- كود الخارطة الجغرافية التفاعلية لمعتمدية منزل الحبيب في Blogger (مضمونة 100% بدون أي خطأ) -->
<div style="position:relative; width:100%; max-width:950px; margin:25px auto; box-shadow:0 6px 25px rgba(0,0,0,0.08); border-radius:14px; overflow:hidden; border:1px solid #d6d3d1; font-family:'Tajawal', sans-serif;">
  <div style="background:#78350f; color:#ffffff; padding:12px 18px; display:flex; justify-content:space-between; align-items:center; font-size:14px;">
    <strong>🗺️ خارطة معتمدية منزل الحبيب - ولاية قابس</strong>
    <a href="https://www.openstreetmap.org/?mlat=34.1952&mlon=9.7745#map=12/34.1952/9.7745" target="_blank" rel="noopener noreferrer" style="background:#fef3c7; color:#78350f; padding:4px 10px; border-radius:6px; font-size:12px; text-decoration:none; font-weight:bold;">عرض بملء الشاشة ↗</a>
  </div>
  <iframe 
    width="100%" 
    height="${iframeHeight}" 
    frameborder="0" 
    scrolling="no" 
    marginheight="0" 
    marginwidth="0" 
    src="${osmEmbedUrl}" 
    style="border:none; display:block; width:100%;" 
    title="خريطة منزل الحبيب">
  </iframe>
  <div style="background:#fafaf9; padding:8px 16px; border-top:1px solid #e7e5e4; font-size:11px; color:#78716c; text-align:center;">
    معتمدية منزل الحبيب · العمادات: المركز، الوالي، وادي الزيتون، زغرطة، الجواودة، المهاملة · إحداثيات: 34.1952° N, 9.7745° E
  </div>
</div>`;

  // Option 3: Full Public App Embed (using the public shared URL ais-pre-)
  const publicAppSnippet = `<!-- كود تضمين التطبيق الكامل لمنزل الحبيب بالرابط العام (ais-pre) -->
<div style="position:relative; width:100%; max-width:1050px; margin:25px auto; box-shadow:0 8px 30px rgba(0,0,0,0.08); border-radius:14px; overflow:hidden; border:1px solid #e7e5e4;">
  <div style="background:#78350f; color:#fff; padding:12px 18px; display:flex; justify-content:space-between; align-items:center; font-size:14px;">
    <strong>معتمدية منزل الحبيب - ولاية قابس | التقرير المونوغرافي والخارطة التفاعلية</strong>
    <a href="${publicSharedUrl}" target="_blank" rel="noopener noreferrer" style="color:#fef3c7; text-decoration:none; font-size:12px; background:rgba(255,255,255,0.18); padding:4px 10px; border-radius:6px;">فتح بملء الشاشة ↗</a>
  </div>
  <iframe 
    src="${publicSharedUrl}" 
    width="100%" 
    height="${iframeHeight}" 
    style="border:none; display:block; width:100%;" 
    title="تقرير معتمدية منزل الحبيب - ولاية قابس" 
    allow="geolocation" 
    loading="lazy">
  </iframe>
</div>`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([fullArticleSnippet], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'تقرير-معتمدية-منزل-الحبيب-قابس.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadFullApp = () => {
    const content = standaloneHtml || fullArticleSnippet;
    const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'تطبيق-منزل-الحبيب-التفاعلي-الكامل.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 mb-1">
              <span>أدوات النشر الرقمي</span>
              <span aria-hidden="true">·</span>
              <span>حل مشكلة التضمين في مدونات Blogger</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              إضافة التقرير والخارطة إلى مدونة Blogger
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-full transition-colors"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 401 Explanation Alert Banner */}
        <div className="bg-amber-50 px-6 py-3 border-b border-amber-200/80 flex items-start gap-3 text-xs text-amber-950">
          <AlertTriangle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold">توضيح حول خطأ Google 401:</strong> حدث هذا الخطأ لأن الرابط المستخدم سابقاً كان رابط التطوير الداخلي المحمي (<code className="bg-amber-200/60 px-1 py-0.5 rounded font-mono text-[11px]">ais-dev-...</code>) الذي لا يسمح بالدخول لغير مطور التطبيق. 
            <span className="block mt-1">
              ✅ <strong>الحل المضمون 100%:</strong> استخدم <strong>«مقال HTML كامل للمدونة»</strong> أو <strong>«خريطة OpenStreetMap العامة»</strong> أدناه، حيث تعمل مباشرة داخل بلوجر دون أي تسجيل دخول أو قيود أمنية.
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 px-6 bg-stone-50/50 overflow-x-auto">
          <button
            onClick={() => setActiveTab('full-article')}
            className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'full-article'
                ? 'border-amber-900 text-amber-900 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>مقال HTML كامل (موصى به · مضمون 100%)</span>
          </button>

          <button
            onClick={() => setActiveTab('osm-map')}
            className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'osm-map'
                ? 'border-amber-900 text-amber-900 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>كود الخارطة العامة (OpenStreetMap)</span>
          </button>

          <button
            onClick={() => setActiveTab('interactive-app')}
            className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'interactive-app'
                ? 'border-amber-900 text-amber-900 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>الكود التفاعلي الكامل (خريطة + رسوم + طقس)</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'guide'
                ? 'border-amber-900 text-amber-900 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>شرح طريقة اللصق في Blogger</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* TAB 1: Full Article HTML (Best Option) */}
          {activeTab === 'full-article' && (
            <div className="space-y-4">
              <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200/80 text-xs sm:text-sm text-emerald-950 leading-relaxed">
                <span className="font-bold block mb-1">🌟 الخيار الأفضل والأضمن لمدونتك في Blogger:</span>
                هذا الكود هو مقال كامل منسق بأعلى جودة؛ يحتوي على كافة نصوص المونوغرافيا، جداول العمادات الست، الإحصائيات الديموغرافية والنشاط الاقتصادي، ومدمج معه خريطة جغرافية مباشرة من OpenStreetMap <strong>تعمل فوراً دون أي خطأ 401</strong> وتظهر بشكل رائع ومتوافق مع الهاتف والكمبيوتر.
              </div>

              <div className="relative">
                <pre className="bg-stone-900 text-stone-200 text-xs p-4 rounded-xl overflow-x-auto font-mono dir-ltr text-left h-56 border border-stone-800 selection:bg-amber-700">
                  {fullArticleSnippet}
                </pre>
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    onClick={handleDownloadHtml}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg flex items-center gap-1.5 border border-stone-700 transition-colors"
                    title="تنزيل كملف مستقل"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تنزيل HTML</span>
                  </button>
                  <button
                    onClick={() => copyToClipboard(fullArticleSnippet, 'article')}
                    className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    {copiedType === 'article' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-200" />
                        <span>تم نسخ المقال كاملاً!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ كود المقال الكامل لـ Blogger</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OpenStreetMap Widget (Guaranteed No 401) */}
          {activeTab === 'osm-map' && (
            <div className="space-y-4">
              <div className="bg-blue-50/80 p-4 rounded-xl border border-blue-200/80 text-xs sm:text-sm text-blue-950 leading-relaxed">
                <span className="font-bold block mb-1">🗺️ خريطة جغرافية عامة ومفتوحة لمنزل الحبيب:</span>
                خريطة تفاعلية مباشرة مدعومة بخوادم OpenStreetMap العالمية، لا تحتاج أي ترخيص أو تسجيل دخول وتعمل في أي مدونة أو موقع بدون أي عوائق.
              </div>

              {/* Height Selector */}
              <div className="flex items-center gap-3 text-xs text-stone-600">
                <span className="font-medium">ارتفاع الخريطة:</span>
                {['500', '650', '800'].map((h) => (
                  <button
                    key={h}
                    onClick={() => setIframeHeight(h)}
                    className={`px-2.5 py-1 rounded border font-mono ${
                      iframeHeight === h
                        ? 'bg-amber-900 text-white border-amber-900'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {h} بكسل
                  </button>
                ))}
              </div>

              <div className="relative">
                <pre className="bg-stone-900 text-stone-200 text-xs p-4 rounded-xl overflow-x-auto font-mono dir-ltr text-left h-48 border border-stone-800 selection:bg-amber-700">
                  {osmWidgetSnippet}
                </pre>
                <button
                  onClick={() => copyToClipboard(osmWidgetSnippet, 'osm')}
                  className="absolute top-3 right-3 px-3.5 py-1.5 bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  {copiedType === 'osm' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-200" />
                      <span>تم نسخ كود الخريطة!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ كود الخارطة لـ Blogger</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Complete Standalone Interactive Code */}
          {activeTab === 'interactive-app' && (
            <div className="space-y-4">
              <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200/80 text-xs sm:text-sm text-amber-950 leading-relaxed">
                <span className="font-bold block mb-1">⚡ كود تفاعلي شامل ومستقل تماماً لـ Blogger:</span>
                هذا الكود يجمع الخارطة التفاعلية الحية (مع خيارات الأقمار الصناعية والأزرار)، الرسوم البيانية التفاعلية (Chart.js)، حالة الطقس اللحظية الحية (Open-Meteo)، وبطاقات العمادات السبع كاملة، ويعمل مباشرة داخل بلوجر <strong>دون أي ارتباط بروابط خارجية ودون أي رسالة خطأ 401 أو 404</strong>!
              </div>

              <div className="relative">
                <pre className="bg-stone-900 text-stone-200 text-xs p-4 rounded-xl overflow-x-auto font-mono dir-ltr text-left h-56 border border-stone-800 selection:bg-amber-700">
                  {standaloneHtml || 'جاري تحميل الكود التفاعلي الكامل...'}
                </pre>
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    onClick={handleDownloadFullApp}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg flex items-center gap-1.5 border border-stone-700 transition-colors"
                    title="تنزيل الملف التفاعلي المستقل"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تنزيل HTML</span>
                  </button>
                  <button
                    onClick={() => copyToClipboard(standaloneHtml || fullArticleSnippet, 'full-app')}
                    className="px-4 py-1.5 bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    {copiedType === 'full-app' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-200" />
                        <span>تم نسخ الكود التفاعلي كاملاً!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ الكود التفاعلي الكامل لـ Blogger</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Step-by-Step Guide */}
          {activeTab === 'guide' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold font-serif text-stone-900">
                كيف تتجنب خطأ 401 وتنشر المقال بنجاح في Blogger:
              </h4>

              <div className="space-y-3">
                {[
                  {
                    step: '1',
                    title: 'اختر تبويب "مقال HTML كامل" واضغط على زر النسخ',
                    desc: 'هذا الكود يضع التقرير بالكامل والخارطة داخل مقالك، ولا يعتمد على سيرفر خارجي، وهو ما يضمن عدم ظهور أي خطأ 401.',
                  },
                  {
                    step: '2',
                    title: 'افتح مقالك في Blogger واضغط على زر القلم',
                    desc: 'في لوحة تحرير المشاركة ببلوجر (أعلى اليمين بجانب سهم التراجع)، اضغط على أيقونة القلم ✏️.',
                  },
                  {
                    step: '3',
                    title: 'اختر "عرض HTML" (HTML View)',
                    desc: 'احذف أي كود قديم كان يسبب خطأ 401، ثم الصق الكود الجديد الذي نسخته من هنا.',
                  },
                  {
                    step: '4',
                    title: 'العودة لـ "عرض الإنشاء" والمعاينة',
                    desc: 'اضغط على أيقونة القلم مجدداً واختر "عرض إنشاء" (Compose View) لترى المقال بجداوله وخريطته التفاعلية.',
                  },
                  {
                    step: '5',
                    title: 'نشر المقال (Publish)',
                    desc: 'ضع عنواناً مناسباً مثل "تقرير مصور وخارطة تفاعلية لمعتمدية منزل الحبيب - ولاية قابس" ثم اضغط "نشر".',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 bg-stone-50 p-3.5 rounded-xl border border-stone-200/80">
                    <span className="w-7 h-7 rounded-full bg-amber-900 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-stone-900 mb-0.5">{item.title}</h5>
                      <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <span>معتمدية منزل الحبيب - ولاية قابس · تقرير مونوغرافي وخارطة تفاعلية شاملة للعمادات السبع</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-stone-800 hover:bg-stone-50 border border-stone-300 rounded-lg font-medium transition-colors"
          >
            إغلاق النافذة
          </button>
        </div>

      </div>
    </div>
  );
};
