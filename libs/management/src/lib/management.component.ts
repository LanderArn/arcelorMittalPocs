import {
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';

import { RouterLink } from '@angular/router';
import { ManagementFacade } from './management.facade';
import { ManagementStore } from './management.store';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AmTableColumn, AmTableComponent } from '@arcelor-mittal-pocs/ui-kit';
import { Container } from '../../../containers/src/lib/types/containers.types';
import { ApiService } from '@arcelor-mittal-pocs/shared';

@Component({
  selector: 'management',
  imports: [ButtonModule, TableModule, AmTableComponent, RouterLink],
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
  providers: [ManagementFacade, ManagementStore, ApiService],
})
export class ManagementComponent {
  readonly #managementFacade = inject(ManagementFacade);
  readonly containers = this.#managementFacade.containers;

  readonly columns = computed<AmTableColumn<Container>[]>(() => [
    { label: 'Container Id', key: 'id' },
    { label: 'Waste Type', key: 'wasteType' },
    { label: 'Capacity', key: 'capacityKg' },
    { label: 'CurrentFillLevel', key: 'currentFillLevelKg' },
  ]);

  constructor() {
    effect(() => {
      console.log('containers!', this.containers());
    });
  }

  ngOnInit(): void {
    this.#managementFacade.getAllContainers();
  }
}
