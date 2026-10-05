import React, { useState, useEffect } from 'react';
import { SECTORS_DATA } from '../data/menzelHabibData';
import { Sector } from '../types/data';
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudLightning,
  Wind,
  Droplets,
  Gauge,
  Compass,
  RefreshCw,
  MapPin,
  Calendar,
  AlertCircle,
} from 'lucide-react';

interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  precipitation: number;
  weatherCode: number;
  time: string;
}

interface DailyForecast {
  time: string[];
  weatherCode: number[];
  tempMax: number[];
  tempMin: number[];
  precipitationSum: number[];
  windSpeedMax: number[];
  uvIndexMax: number[];
}

export const WeatherWidget: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<Sector>(SECTORS_DATA[0]);
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [daily, setDaily] = useState<DailyForecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchWeatherData = async (lat: number, lng: number) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,uv_index_max&timezone=Africa%2FTunis`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('فشل جلب بيانات الطقس من المصدر المباشر.');
      const data = await res.json();

      setCurrent({
        temperature: Math.round(data.current.temperature_2m),
        apparentTemperature: Math.round(data.current.apparent_temperature),
        relativeHumidity: data.current.relative_humidity_2m,
        windSpeed: Math.round(data.current.wind_speed_10m),
        windDirection: data.current.wind_direction_10m,
        pressure: Math.round(data.current.surface_pressure),
        precipitation: data.current.precipitation,
        weatherCode: data.current.weather_code,
        time: data.current.time,
      });

      setDaily({
        time: data.daily.time,
        weatherCode: data.daily.weather_code,
        tempMax: data.daily.temperature_2m_max.map((t: number) => Math.round(t)),
        tempMin: data.daily.temperature_2m_min.map((t: number) => Math.round(t)),
        precipitationSum: data.daily.precipitation_sum,
        windSpeedMax: data.daily.wind_speed_10m_max.map((w: number) => Math.round(w)),
        uvIndexMax: data.daily.uv_index_max,
      });

      const now = new Date();
      setLastUpdated(now.toLocaleTimeString('ar-TN', { hour: '2-digit', minute: '2-digit' }));
    } catch (err: any) {
      setError(err.message || 'تعذر الاتصال بخدمة الأرصاد الجوية.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(selectedSector.coordinates[0], selectedSector.coordinates[1]);
  }, [selectedSector]);

  // WMO Weather code interpreter in Arabic
  const getWeatherInfo = (code: number) => {
    if (code === 0) return { text: 'صافٍ ومشمس تماماً', icon: Sun, color: 'text-amber-500' };
    if (code === 1 || code === 2) return { text: 'قليل الغيوم إلى غائم جزئياً', icon: CloudSun, color: 'text-amber-600' };
    if (code === 3) return { text: 'غائم غالباً', icon: Cloud, color: 'text-stone-500' };
    if (code >= 45 && code <= 48) return { text: 'ضباب محلي خفيف', icon: Cloud, color: 'text-stone-400' };
    if (code >= 51 && code <= 55) return { text: 'رذاذ خفيف متفرق', icon: CloudRain, color: 'text-blue-400' };
    if (code >= 61 && code <= 67) return { text: 'أمطار متفرقة', icon: CloudRain, color: 'text-blue-600' };
    if (code >= 80 && code <= 82) return { text: 'زخات مطرية عابرة', icon: CloudRain, color: 'text-blue-500' };
    if (code >= 95) return { text: 'عواصف رعدية موسمية', icon: CloudLightning, color: 'text-purple-600' };
    return { text: 'طقس معتدل', icon: Sun, color: 'text-amber-500' };
  };

  const getWindDirectionLabel = (degree: number) => {
    if (degree >= 337.5 || degree < 22.5) return 'شمالية';
    if (degree >= 22.5 && degree < 67.5) return 'شمالية شرقية';
    if (degree >= 67.5 && degree < 112.5) return 'شرقية (بحرية)';
    if (degree >= 112.5 && degree < 157.5) return 'جنوبية شرقية';
    if (degree >= 157.5 && degree < 202.5) return 'جنوبية (شهيلي صيفي)';
    if (degree >= 202.5 && degree < 247.5) return 'جنوبية غربية';
    if (degree >= 247.5 && degree < 292.5) return 'غربية (صحراوية)';
    return 'شمالية غربية';
  };

  const formatDayName = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ar-TN', { weekday: 'long' });
  };

  return (
    <section id="weather" className="py-12 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 mb-1">
              <span>الأرصاد والمناخ المحلي المباشر</span>
              <span aria-hidden="true">·</span>
              <span>بيانات حية عبر الأقمار الصناعية ومحطات الرصد</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              حالة الطقس الآن والتوقعات في معتمدية منزل الحبيب
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-2xl leading-relaxed">
              رصد حي لدرجات الحرارة، سرعة الرياح، الرطوبة السطحية، وفرص التساقطات لعمادات المعتمدية استناداً إلى بيانات الإحداثيات الجغرافية الدقيقة.
            </p>
          </div>

          {/* Sector Selector & Refresh */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
              <MapPin className="w-3.5 h-3.5 text-amber-800 ml-1.5 shrink-0" />
              <select
                value={selectedSector.id}
                onChange={(e) => {
                  const match = SECTORS_DATA.find((s) => s.id === e.target.value);
                  if (match) setSelectedSector(match);
                }}
                className="bg-transparent text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer pr-1"
              >
                {SECTORS_DATA.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.nameAr} ({sec.coordinates[0].toFixed(2)}°N)
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => fetchWeatherData(selectedSector.coordinates[0], selectedSector.coordinates[1])}
              disabled={loading}
              className="p-2 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors border border-stone-200"
              title="تحديث بيانات الطقس"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-800' : ''}`} />
            </button>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-xs flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => fetchWeatherData(selectedSector.coordinates[0], selectedSector.coordinates[1])}
              className="text-xs font-bold underline"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* Weather Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Current Conditions Banner (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-amber-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between relative overflow-hidden">
            {/* Background desert steppe contour glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              {/* Header */}
              <div className="flex items-center justify-between text-xs text-amber-200/80 mb-4 border-b border-amber-800/80 pb-3">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{selectedSector.nameAr}</span>
                </div>
                <span className="font-mono text-[11px] text-amber-300">
                  {lastUpdated ? `تحديث: ${lastUpdated}` : 'جاري الرصد...'}
                </span>
              </div>

              {/* Main Temperature & Weather Icon */}
              {loading && !current ? (
                <div className="py-12 text-center text-amber-200 text-sm animate-pulse">
                  جاري تحميل بيانات الأرصاد الجوية اللحظية...
                </div>
              ) : current ? (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-5xl sm:text-6xl font-serif font-bold tracking-tight block font-mono tabular-nums text-white">
                        {current.temperature}°
                      </span>
                      <span className="text-xs text-amber-300 block mt-1">
                        الحرارة المحسوسة: {current.apparentTemperature}° مئوية
                      </span>
                    </div>

                    {/* Dynamic Weather Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center p-3 border border-white/10">
                      {React.createElement(getWeatherInfo(current.weatherCode).icon, {
                        className: `w-10 h-10 ${getWeatherInfo(current.weatherCode).color}`,
                      })}
                    </div>
                  </div>

                  <p className="text-base sm:text-lg font-serif font-medium text-amber-100 mb-6">
                    {getWeatherInfo(current.weatherCode).text}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Weather Metrics Sub-Grid */}
            {current && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-amber-800/70 text-xs">
                <div className="bg-amber-950/60 p-2.5 rounded-xl border border-amber-800/50">
                  <div className="flex items-center gap-1 text-amber-400 text-[10px] mb-0.5">
                    <Wind className="w-3 h-3" />
                    <span>الرياح</span>
                  </div>
                  <span className="font-bold text-white font-mono tabular-nums">{current.windSpeed} كم/س</span>
                  <span className="text-[10px] text-amber-300 block truncate">{getWindDirectionLabel(current.windDirection)}</span>
                </div>

                <div className="bg-amber-950/60 p-2.5 rounded-xl border border-amber-800/50">
                  <div className="flex items-center gap-1 text-amber-400 text-[10px] mb-0.5">
                    <Droplets className="w-3 h-3" />
                    <span>الرطوبة</span>
                  </div>
                  <span className="font-bold text-white font-mono tabular-nums">{current.relativeHumidity}%</span>
                  <span className="text-[10px] text-amber-300 block">سطحية</span>
                </div>

                <div className="bg-amber-950/60 p-2.5 rounded-xl border border-amber-800/50">
                  <div className="flex items-center gap-1 text-amber-400 text-[10px] mb-0.5">
                    <Gauge className="w-3 h-3" />
                    <span>الضغط</span>
                  </div>
                  <span className="font-bold text-white font-mono tabular-nums">{current.pressure}</span>
                  <span className="text-[10px] text-amber-300 block">hPa</span>
                </div>

                <div className="bg-amber-950/60 p-2.5 rounded-xl border border-amber-800/50">
                  <div className="flex items-center gap-1 text-amber-400 text-[10px] mb-0.5">
                    <Sun className="w-3 h-3" />
                    <span>أمطار اليوم</span>
                  </div>
                  <span className="font-bold text-white font-mono tabular-nums">{current.precipitation} ملم</span>
                  <span className="text-[10px] text-amber-300 block">تراكمي</span>
                </div>
              </div>
            )}
          </div>

          {/* 7-Day Forecast Rail (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF8F5] rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-4 border-b border-stone-200/80 pb-2">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-800" />
                  <span>توقعات الأيام السبعة القادمة</span>
                </span>
                <span className="font-mono text-[11px] text-stone-400">
                  منطقة: {selectedSector.nameAr}
                </span>
              </div>

              {loading && !daily ? (
                <div className="py-16 text-center text-stone-400 text-sm">
                  جاري جلب توقعات الطقس...
                </div>
              ) : daily ? (
                <div className="divide-y divide-stone-200/70">
                  {daily.time.slice(0, 7).map((date, idx) => {
                    const info = getWeatherInfo(daily.weatherCode[idx]);
                    const Icon = info.icon;
                    return (
                      <div key={date} className="py-2.5 flex items-center justify-between text-xs">
                        {/* Day Name & Date */}
                        <div className="w-28 sm:w-32">
                          <span className="font-bold text-stone-900 block font-serif">
                            {idx === 0 ? 'اليوم' : idx === 1 ? 'غداً' : formatDayName(date)}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono">{date}</span>
                        </div>

                        {/* Weather Condition Icon & Text */}
                        <div className="flex items-center gap-2 flex-1 justify-start">
                          <Icon className={`w-4 h-4 ${info.color} shrink-0`} />
                          <span className="text-stone-600 text-[11px] hidden sm:inline truncate max-w-[150px]">
                            {info.text}
                          </span>
                        </div>

                        {/* Precipitation if any */}
                        <div className="w-20 text-center font-mono text-[11px] text-stone-500">
                          {daily.precipitationSum[idx] > 0 ? (
                            <span className="text-blue-700 font-semibold">{daily.precipitationSum[idx]} ملم</span>
                          ) : (
                            <span className="text-stone-300">0 ملم</span>
                          )}
                        </div>

                        {/* Max / Min Temperatures */}
                        <div className="w-24 text-left font-mono font-bold flex items-center justify-end gap-2 tabular-nums">
                          <span className="text-amber-950 text-sm">{daily.tempMax[idx]}°</span>
                          <span className="text-stone-400 text-xs font-normal">/ {daily.tempMin[idx]}°</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {/* Regional Climate Context Note */}
            <div className="mt-4 pt-3 border-t border-stone-200/80 text-[11px] text-stone-500 flex items-center justify-between">
              <span>* المناخ السائد: متوسطي شبه جاف، سطوع شمسي مرتفع ملائم لمشاريع الطاقة الشمسية.</span>
              <span className="text-amber-900 font-medium">بيانات حية محدثة</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
