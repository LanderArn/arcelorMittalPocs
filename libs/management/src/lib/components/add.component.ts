import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { form, required, min, FormField } from '@angular/forms/signals';
import { ManagementFacade } from '../management.facade';
import { ManagementStore } from '../management.store';
import { ApiService } from '@arcelor-mittal-pocs/shared';

@Component({
  standalone: true,
  selector: 'add',
  imports: [
    FormsModule,
    ButtonModule,
    SelectModule,
    InputNumberModule,
    FormField,
  ],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [ManagementFacade, ManagementStore, ApiService],
})
export class AddComponent {
  readonly #managementFacade = inject(ManagementFacade);

  readonly wasteTypesOptions = this.#managementFacade.wasteTypesOptions;

  containerModel = signal({
    wasteType: '',
    location: '',
    capacityKg: 0,
    currentFillLevelKg: 0,
  });

  containerForm = form(this.containerModel, (f) => {
    required(f.wasteType);
    required(f.location);
    min(f.capacityKg, 0);
    min(f.currentFillLevelKg, 0);
  });

  ngOnInit(): void {
    this.#managementFacade.getAllWasteTypes();
  }

  createContainer() {
    const container = this.containerForm().value();
    console.log('Created container:', container);
    // TODO call facade to create container
  }

  wasteTypeChange(event: any) {
    this.containerModel.update((model) => ({ ...model, wasteType: event }));
  }
}
