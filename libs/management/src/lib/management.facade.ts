import { computed, inject, Injectable, Signal } from '@angular/core';
import { ManagementStore } from './management.store';
import { DefaultListState, WasteType } from '@arcelor-mittal-pocs/shared';
import { Container } from '../../../containers/src/lib/types/containers.types';

@Injectable()
export class ManagementFacade {
  readonly #managementStore = inject(ManagementStore);

  readonly containers: Signal<DefaultListState<Container>> =
    this.#managementStore.containers;

  readonly wasteTypes: Signal<DefaultListState<WasteType>> =
    this.#managementStore.wasteTypes;

  readonly wasteTypesOptions = computed(() =>
    this.wasteTypes().data.map(wasteType => ({
      label: wasteType.name,
      value: wasteType.id
    }))
  );

  getAllContainers() {
    this.#managementStore.getAllContainers({ userId: '123' });
  }

  getAllWasteTypes() {
    this.#managementStore.getAllWasteTypes({ userId: '123' });
  }
}
