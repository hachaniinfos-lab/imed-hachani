import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InteractiveMap } from './components/InteractiveMap';
import { SectorsGrid } from './components/SectorsGrid';
import { DemographicCharts } from './components/DemographicCharts';
import { WeatherWidget } from './components/WeatherWidget';
import { MonographReport } from './components/MonographReport';
import { PhotoGallery } from './components/PhotoGallery';
import { BloggerEmbedModal } from './components/BloggerEmbedModal';
import { Footer } from './components/Footer';
import { Sector } from './types/data';

export default function App() {
  const [isBloggerModalOpen, setIsBloggerModalOpen] = useState(false);
  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null);

  const handleSelectSector = (sector: Sector) => {
    setSelectedSectorId(sector.id);
    const mapEl = document.getElementById('interactive-map');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreMap = () => {
    const mapEl = document.getElementById('interactive-map');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* 3-Zone Top Bar */}
      <Header
        onOpenBloggerModal={() => setIsBloggerModalOpen(true)}
        onPrintReport={handlePrintReport}
      />

      <main className="flex-1">
        {/* Curatorial Hero & Metrics */}
        <HeroSection
          onOpenBloggerModal={() => setIsBloggerModalOpen(true)}
          onExploreMap={handleExploreMap}
        />

        {/* Interactive GIS Map */}
        <InteractiveMap
          selectedSectorId={selectedSectorId}
          onSelectSector={(s) => setSelectedSectorId(s.id)}
        />

        {/* The 6 Administrative Sectors (العمادات) */}
        <SectorsGrid
          onSelectSector={handleSelectSector}
          selectedSectorId={selectedSectorId}
        />

        {/* Demographic Evolution, Age Structure & Economic Activity (Recharts) */}
        <DemographicCharts />

        {/* Real-time Weather & 7-Day Forecast (Open-Meteo API) */}
        <WeatherWidget />

        {/* Detailed Editorial Monograph Prose & Comparative Indicators */}
        <MonographReport />

        {/* The Illustrated Visual Documentary Gallery */}
        <PhotoGallery />
      </main>

      {/* Institutional Footer */}
      <Footer
        onOpenBloggerModal={() => setIsBloggerModalOpen(true)}
        onPrintReport={handlePrintReport}
      />

      {/* Blogger Export & Embed Modal */}
      <BloggerEmbedModal
        isOpen={isBloggerModalOpen}
        onClose={() => setIsBloggerModalOpen(false)}
        appUrl={window.location.href}
      />
    </div>
  );
}
