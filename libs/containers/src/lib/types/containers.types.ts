import { WasteType } from "@arcelor-mittal-pocs/shared";

export type Container = {
  id: number;
  wasteType: WasteType;
  location: string;
  capacityKg: number;
  currentFillLevelKg: number;
}

