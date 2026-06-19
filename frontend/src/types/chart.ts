// Types for birth chart data structures

export interface Placement {
  sign: string;
  degree: number;
  longitude?: number;
}

export interface BirthChartData {
  planets: Record<string, Placement>;
  ascendant: Placement;
  midheaven: Placement;
  houses: Record<string, Placement>;
  metadata: {
    date: string;
    time: string;
    place: string;
    lat: number;
    lon: number;
    timezone: string;
  };
}

export interface TransitAspect {
  transit_planet: string;
  aspect: string;
  natal_planet: string;
  orb: number;
  description: string;
}

export interface TransitData {
  date: string;
  transit_positions: Record<string, Placement>;
  aspects: TransitAspect[];
  aspect_count: number;
}

export type Element = 'Fire' | 'Earth' | 'Air' | 'Water';
export type Quality = 'Cardinal' | 'Fixed' | 'Mutable';

export interface SignInfo {
  element: Element;
  quality: Quality;
  ruler: string;
  glyph: string;
}
