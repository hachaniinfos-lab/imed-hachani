export interface Sector {
  id: string;
  nameAr: string;
  nameFr: string;
  type: 'مركز' | 'عمادة فلاحية' | 'عمادة رعوية' | 'عمادة جبلية';
  coordinates: [number, number]; // [lat, lng]
  populationEstimate: string;
  areaKm2: string;
  description: string;
  mainActivities: string[];
  keyLandmarks: string[];
  terrainType: string;
  iconType: 'center' | 'agriculture' | 'pastoral' | 'mountain';
}

export interface Landmark {
  id: string;
  nameAr: string;
  category: 'إداري وخدماتي' | 'طبيعي وجغرافي' | 'تاريخي وثقافي' | 'اقتصادي وطاقي';
  coordinates: [number, number];
  description: string;
  sectorId: string;
  elevationM?: number;
  highlight?: string;
}

export interface MetricStat {
  label: string;
  value: string;
  unit?: string;
  subtext: string;
}

export interface GalleryItem {
  id: string;
  titleAr: string;
  category: string;
  description: string;
  caption: string;
  themeColor: string;
  svgType: 'landscape' | 'agriculture' | 'craft' | 'mountain' | 'energy' | 'market';
}

export interface DemographicPoint {
  year: string;
  population: number;
  households: number;
  avgHouseholdSize: number;
  censusType: string;
}

export interface AgeGroupData {
  group: string;
  males: number;
  females: number;
  total: number;
  percentage: number;
  category: 'أطفال ويافعون' | 'شباب' | 'كهول' | 'شيوخ ومسنون';
}

export interface EconomicSectorData {
  sector: string;
  percentage: number;
  workers: number;
  color: string;
  description: string;
  keyJobs: string[];
}
