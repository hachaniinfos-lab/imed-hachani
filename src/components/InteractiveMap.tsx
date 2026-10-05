import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { SECTORS_DATA, LANDMARKS_DATA } from '../data/menzelHabibData';
import { Sector, Landmark } from '../types/data';
import { MapPin, Layers, Navigation, Compass, Info, Check, Maximize2, Minimize2 } from 'lucide-react';

interface InteractiveMapProps {
  onSelectSector?: (sector: Sector) => void;
  selectedSectorId?: string | null;
}

type MapLayerType = 'streets' | 'satellite' | 'topo';

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectSector, selectedSectorId }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [activeLayer, setActiveLayer] = useState<MapLayerType>('streets');
  const [selectedItem, setSelectedItem] = useState<{ type: 'sector'; data: Sector } | { type: 'landmark'; data: Landmark } | null>({
    type: 'sector',
    data: SECTORS_DATA[0], // Default to center
  });
  const [filterCategory, setFilterCategory] = useState<'all' | 'sectors' | 'natural' | 'economy' | 'admin'>('all');
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const MENZEL_HABIB_CENTER: [number, number] = [34.1952, 9.7745];
  const DEFAULT_ZOOM = 11;

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: MENZEL_HABIB_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
      attributionControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Initial tile layer
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map);
    tileLayerRef.current = tileLayer;

    // Layer group for markers
    const markerGroup = L.layerGroup().addTo(map);
    layerGroupRef.current = markerGroup;

    // Track mouse coordinates
    map.on('mousemove', (e) => {
      setCursorCoords({
        lat: parseFloat(e.latlng.lat.toFixed(4)),
        lng: parseFloat(e.latlng.lng.toFixed(4)),
      });
    });

    mapInstanceRef.current = map;

    // Approximate boundary polygon for Menzel El Habib Delegation
    const boundaryPoints: [number, number][] = [
      [34.330, 9.720],
      [34.310, 9.870],
      [34.250, 9.940],
      [34.160, 9.920],
      [34.080, 9.820],
      [34.090, 9.690],
      [34.160, 9.580],
      [34.260, 9.610],
      [34.330, 9.720],
    ];

    const boundaryPolygon = L.polygon(boundaryPoints, {
      color: '#b45309',
      weight: 2,
      opacity: 0.8,
      fillColor: '#d97706',
      fillOpacity: 0.07,
      dashArray: '5, 8',
    }).addTo(map);

    boundaryPolygon.bindTooltip('النطاق الجغرافي التقريبي لمعتمدية منزل الحبيب (ولاية قابس)', {
      sticky: true,
      direction: 'top',
      className: 'bg-stone-900 text-stone-100 text-xs px-2 py-1 rounded shadow-md border-0',
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update tile layer based on activeLayer
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let maxZoom = 18;

    if (activeLayer === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      maxZoom = 18;
    } else if (activeLayer === 'topo') {
      url = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      maxZoom = 17;
    }

    const newTile = L.tileLayer(url, { maxZoom }).addTo(mapInstanceRef.current);
    newTile.bringToBack();
    tileLayerRef.current = newTile;
  }, [activeLayer]);

  // Update markers when filter or selection changes
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;
    const group = layerGroupRef.current;
    group.clearLayers();

    // Render Sectors
    if (filterCategory === 'all' || filterCategory === 'sectors') {
      SECTORS_DATA.forEach((sec) => {
        const isSelected = selectedItem?.type === 'sector' && selectedItem.data.id === sec.id;
        const markerHtml = `
          <div class="relative cursor-pointer transition-transform duration-200 group ${isSelected ? 'scale-125 z-50' : 'hover:scale-110'}">
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-lg border ${
              isSelected
                ? 'bg-amber-800 text-white border-amber-500 ring-2 ring-amber-300'
                : 'bg-white text-stone-900 border-amber-700/40'
            }">
              <span class="w-2 h-2 rounded-full ${sec.id === 'centre' ? 'bg-red-500' : 'bg-amber-600'}"></span>
              <span class="text-xs font-bold whitespace-nowrap">${sec.nameAr}</span>
            </div>
            <div class="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] ${
              isSelected ? 'border-t-amber-800' : 'border-t-white'
            } mx-auto -mt-[1px]"></div>
          </div>
        `;

        const icon = L.divIcon({
          html: markerHtml,
          className: 'custom-sector-icon',
          iconSize: [120, 36],
          iconAnchor: [60, 36],
        });

        const marker = L.marker(sec.coordinates, { icon });
        marker.on('click', () => {
          setSelectedItem({ type: 'sector', data: sec });
          if (onSelectSector) onSelectSector(sec);
        });
        marker.addTo(group);
      });
    }

    // Render Landmarks
    if (filterCategory === 'all' || filterCategory !== 'sectors') {
      const filteredLandmarks = LANDMARKS_DATA.filter((lm) => {
        if (filterCategory === 'all') return true;
        if (filterCategory === 'natural' && lm.category === 'طبيعي وجغرافي') return true;
        if (filterCategory === 'economy' && lm.category === 'اقتصادي وطاقي') return true;
        if (filterCategory === 'admin' && lm.category === 'إداري وخدماتي') return true;
        return false;
      });

      filteredLandmarks.forEach((lm) => {
        const isSelected = selectedItem?.type === 'landmark' && selectedItem.data.id === lm.id;
        let badgeColor = 'bg-stone-800 text-stone-100';
        if (lm.category === 'طبيعي وجغرافي') badgeColor = 'bg-emerald-800 text-emerald-50';
        if (lm.category === 'اقتصادي وطاقي') badgeColor = 'bg-blue-800 text-blue-50';
        if (lm.category === 'إداري وخدماتي') badgeColor = 'bg-amber-900 text-amber-50';

        const markerHtml = `
          <div class="relative cursor-pointer transition-transform duration-200 ${isSelected ? 'scale-125 z-50' : 'hover:scale-110'}">
            <div class="w-8 h-8 rounded-full shadow-md flex items-center justify-center border-2 border-white ${badgeColor}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
          </div>
        `;

        const icon = L.divIcon({
          html: markerHtml,
          className: 'custom-landmark-icon',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker(lm.coordinates, { icon });
        marker.bindTooltip(lm.nameAr, { direction: 'top', offset: [0, -14], className: 'text-xs font-semibold' });
        marker.on('click', () => {
          setSelectedItem({ type: 'landmark', data: lm });
        });
        marker.addTo(group);
      });
    }
  }, [filterCategory, selectedItem, onSelectSector]);

  // Sync external selectedSectorId
  useEffect(() => {
    if (!selectedSectorId) return;
    const match = SECTORS_DATA.find((s) => s.id === selectedSectorId);
    if (match && mapInstanceRef.current) {
      setSelectedItem({ type: 'sector', data: match });
      mapInstanceRef.current.panTo(match.coordinates, { animate: true });
    }
  }, [selectedSectorId]);

  const handleZoomToSelection = () => {
    if (!mapInstanceRef.current || !selectedItem) return;
    mapInstanceRef.current.setView(selectedItem.data.coordinates, 13, { animate: true });
  };

  const handleResetView = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setView(MENZEL_HABIB_CENTER, DEFAULT_ZOOM, { animate: true });
    setSelectedItem({ type: 'sector', data: SECTORS_DATA[0] });
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);
  };

  return (
    <section id="interactive-map" className={`relative bg-stone-100 ${isFullScreen ? 'fixed inset-0 z-50 p-4 bg-stone-900/90 backdrop-blur-sm' : 'my-12'}`}>
      <div className={`mx-auto ${isFullScreen ? 'h-full flex flex-col' : 'max-w-7xl px-4 sm:px-6 lg:px-8'}`}>
        
        {/* Section Header (Quiet Editorial) */}
        {!isFullScreen && (
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-amber-800 mb-1">
                <span>نظام المعلومات الجغرافية</span>
                <span aria-hidden="true">·</span>
                <span>ولاية قابس</span>
                <span aria-hidden="true">·</span>
                <span>الجمهورية التونسية</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                الخارطة التفاعلية الشاملة لمعتمدية منزل الحبيب
              </h2>
              <p className="text-stone-600 text-sm mt-1 max-w-2xl leading-relaxed">
                استكشف جغرافية المعتمدية، مواقع العمادات السبع، المعالم التضاريسية مثل جبل خشم مريم، والمسالك الفلاحية ومشاريع الطاقة الكهروضوئية.
              </p>
            </div>

            {/* Quick stats inline */}
            <div className="flex items-center gap-4 text-xs text-stone-500 font-mono tabular-nums">
              <div>
                <span className="block text-stone-400">الإحداثيات المرجعية</span>
                <span className="font-semibold text-stone-800">34.1952° N, 9.7745° E</span>
              </div>
              <div className="border-r border-stone-300 pr-4">
                <span className="block text-stone-400">العمادات</span>
                <span className="font-semibold text-stone-800">7 عمادات ترابية</span>
              </div>
            </div>
          </div>
        )}

        {/* Map Toolbar (Segmented Controls) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 bg-white p-2.5 rounded-xl border border-stone-200 shadow-sm">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5">
            <span className="text-xs text-stone-500 pl-2 font-medium hidden sm:inline">تصفية المعالم:</span>
            {[
              { id: 'all', label: 'كافة المعالم والعمادات' },
              { id: 'sectors', label: 'العمادات (7)' },
              { id: 'natural', label: 'طبيعي وجبال' },
              { id: 'economy', label: 'اقتصادي وطاقي' },
              { id: 'admin', label: 'إداري وخدماتي' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  filterCategory === tab.id
                    ? 'bg-amber-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Map Layer Switcher & Tools */}
          <div className="flex items-center gap-2 mr-auto">
            {/* Layers */}
            <div className="flex items-center bg-stone-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveLayer('streets')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeLayer === 'streets' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="خريطة الشوارع والمسالك"
              >
                شوارع
              </button>
              <button
                onClick={() => setActiveLayer('satellite')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeLayer === 'satellite' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="صور فضائية بالأقمار الصناعية"
              >
                فضائي
              </button>
              <button
                onClick={() => setActiveLayer('topo')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeLayer === 'topo' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
                title="طبوغرافي وتضاريس جبلية"
              >
                طبوغرافي
              </button>
            </div>

            {/* Reset View Button */}
            <button
              onClick={handleResetView}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg border border-stone-200 transition-colors"
              title="إعادة التمركز على مركز المعتمدية"
            >
              <Navigation className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullScreen}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg border border-stone-200 transition-colors"
              title={isFullScreen ? 'تصغير الخريطة' : 'ملء الشاشة'}
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Map Layout Grid: Canvas + Detail Drawer */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-4 ${isFullScreen ? 'flex-1 min-h-0' : 'h-[620px]'}`}>
          
          {/* Map Canvas (8 cols on desktop) */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-stone-300 shadow-inner h-full min-h-[380px]">
            <div ref={mapContainerRef} className="w-full h-full z-0" />

            {/* Overlay Map Badge (North & Scale) */}
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-stone-200/80 shadow-xs text-[11px] text-stone-700 flex items-center gap-2 pointer-events-none z-10">
              <Compass className="w-3.5 h-3.5 text-amber-800 animate-pulse" />
              <span>مقياس المعاينة: معتمدية منزل الحبيب والحدود المجاورة</span>
            </div>

            {/* Mouse Coordinates Tracker */}
            {cursorCoords && (
              <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-xs text-stone-200 text-[11px] font-mono px-2.5 py-1 rounded shadow-xs pointer-events-none z-10 flex items-center gap-2 tabular-nums">
                <span>Lat: {cursorCoords.lat}°</span>
                <span>·</span>
                <span>Lng: {cursorCoords.lng}°</span>
              </div>
            )}
          </div>

          {/* Selected Item Detail Panel (4 cols on desktop) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 shadow-sm p-5 flex flex-col justify-between overflow-y-auto max-h-full">
            {selectedItem ? (
              <div className="space-y-4">
                {/* Header */}
                <div className="border-b border-stone-100 pb-3">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span className="font-semibold text-amber-800">
                      {selectedItem.type === 'sector' ? 'عمادة ترابية إدارية' : 'معلم جغرافي / اقتصادي'}
                    </span>
                    <span className="font-mono text-[11px] bg-stone-100 px-2 py-0.5 rounded text-stone-700">
                      {selectedItem.data.coordinates[0].toFixed(3)}°N, {selectedItem.data.coordinates[1].toFixed(3)}°E
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-stone-900">
                    {selectedItem.data.nameAr}
                  </h3>
                  {selectedItem.type === 'sector' && (
                    <p className="text-xs text-stone-400 font-sans tracking-wide mt-0.5">
                      {selectedItem.data.nameFr}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="text-stone-700 text-sm leading-relaxed">
                  {selectedItem.data.description}
                </p>

                {/* Specifics */}
                {selectedItem.type === 'sector' ? (
                  <div className="space-y-3 pt-1">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                        <span className="text-stone-400 block mb-0.5">تقدير السكان</span>
                        <span className="font-semibold text-stone-800">{selectedItem.data.populationEstimate}</span>
                      </div>
                      <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                        <span className="text-stone-400 block mb-0.5">المساحة المقدرة</span>
                        <span className="font-semibold text-stone-800">{selectedItem.data.areaKm2}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-stone-900 mb-1.5">الأنشطة الاقتصادية والاجتماعية:</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedItem.data.mainActivities.map((act, idx) => (
                          <span key={idx} className="text-xs bg-amber-50/80 text-amber-900 border border-amber-200/50 px-2 py-0.5 rounded-md">
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-stone-900 mb-1">طبيعة التضاريس والتربة:</h4>
                      <p className="text-xs text-stone-600 bg-stone-50 p-2 rounded-lg border border-stone-100">
                        {selectedItem.data.terrainType}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 pt-1">
                    <div className="bg-stone-50 p-3 rounded-lg border border-stone-100 space-y-2 text-xs">
                      {selectedItem.data.elevationM && (
                        <div className="flex justify-between">
                          <span className="text-stone-500">الارتفاع عن سطح البحر:</span>
                          <span className="font-bold text-stone-800 font-mono tabular-nums">{selectedItem.data.elevationM} متر</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-stone-500">التصنيف الموضوعي:</span>
                        <span className="font-semibold text-amber-900">{selectedItem.data.category}</span>
                      </div>
                      {selectedItem.data.highlight && (
                        <div className="border-t border-stone-200 pt-2 text-stone-700 italic">
                          "{selectedItem.data.highlight}"
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                  <button
                    onClick={handleZoomToSelection}
                    className="flex-1 py-2 px-3 text-xs font-medium text-white bg-amber-900 hover:bg-amber-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>تكبير موقع هذا المعلم</span>
                  </button>
                  <button
                    onClick={handleResetView}
                    className="py-2 px-3 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                  >
                    إعادة الضبط
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                <MapPin className="w-10 h-10 mb-2 stroke-1 text-stone-300" />
                <p className="text-sm">انقر فوق أي عمادة أو نقطة على الخريطة لعرض بطاقتها التوثيقية وإحداثياتها</p>
              </div>
            )}

            {/* Quick Sector Selector Carousel */}
            <div className="mt-4 pt-3 border-t border-stone-100">
              <span className="text-[11px] text-stone-400 block mb-1.5 font-medium">الانتقال السريع للعمادات:</span>
              <div className="grid grid-cols-3 gap-1.5">
                {SECTORS_DATA.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedItem({ type: 'sector', data: s });
                      if (mapInstanceRef.current) {
                        mapInstanceRef.current.panTo(s.coordinates, { animate: true });
                      }
                      if (onSelectSector) onSelectSector(s);
                    }}
                    className={`px-2 py-1 text-[11px] font-medium rounded text-center truncate transition-colors ${
                      selectedItem?.type === 'sector' && selectedItem.data.id === s.id
                        ? 'bg-amber-100 text-amber-950 font-bold border border-amber-300'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {s.nameAr.replace('عمادة ', '').replace(' المركز', '')}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
