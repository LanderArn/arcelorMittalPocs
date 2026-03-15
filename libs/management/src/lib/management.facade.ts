import { inject, Injectable, Signal } from '@angular/core';
import { ManagementStore } from './management.store';
import { DefaultListState } from '@arcelor-mittal-pocs/shared';
import { Container } from '../../../containers/src/lib/types/containers.types';

@Injectable()
export class ManagementFacade {
  readonly #managementStore = inject(ManagementStore);

  readonly containers: Signal<DefaultListState<Container>> =
    this.#managementStore.containers;

  getAllContainers() {
    this.#managementStore.getAllContainers({ userId: '123' });
  }
}
