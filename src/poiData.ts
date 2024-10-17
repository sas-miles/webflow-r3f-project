// poiData.ts
export interface POI {
  id: string;
  position: [number, number, number];
}

export const poiData: POI[] = [
  { id: "poi-1", position: [0, 0, 0] },
  { id: "poi-2", position: [5, 0, 0] },
  // Add more POIs
];
