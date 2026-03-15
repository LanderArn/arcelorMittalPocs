import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Container } from '../../../../containers/src/lib/types/containers.types';
import { WasteType } from '@arcelor-mittal-pocs/shared';

export let WASTE_TYPES: WasteType[] = [
  {
    id: 1,
    name: 'Blast Furnace Slag',
    description:
      'By-product from iron production in the blast furnace, often reused in cement production.',
    category: 'ByProduct',
    maxAmountKg: 50000,
  },
  {
    id: 2,
    name: 'Steel Scrap',
    description:
      'Recyclable steel pieces and leftover metal from production processes.',
    category: 'Recyclable Metal',
    maxAmountKg: 20000,
  },
  {
    id: 3,
    name: 'Refractory Waste',
    description: 'Used refractory bricks and linings from furnaces and ladles.',
    category: 'Industrial Waste',
    maxAmountKg: 3000,
  },
];

export let CONTAINERS: Container[] = [
  {
    id: 1,
    wasteType: WASTE_TYPES[0], 
    location: 'Blast Furnace Yard',
    capacityKg: 80000,
    currentFillLevelKg: 52000,
  },
  {
    id: 2,
    wasteType: WASTE_TYPES[1], 
    location: 'Scrap Yard A',
    capacityKg: 40000,
    currentFillLevelKg: 17500,
  },
  {
    id: 3,
    wasteType: WASTE_TYPES[2], 
    location: 'Hot Rolling Mill',
    capacityKg: 10000,
    currentFillLevelKg: 6200,
  },
  {
    id: 4,
    wasteType: WASTE_TYPES[2], 
    location: 'Coke Plant Storage',
    capacityKg: 5000,
    currentFillLevelKg: 2100,
  }
];

@Injectable()
export class ApiService {
  getAllContainers() {
    return of(CONTAINERS);
  }

  getAllWasteTypes() {
    return of(WASTE_TYPES);
  }
}
