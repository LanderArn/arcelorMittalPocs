import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { form, required, min, FormField } from '@angular/forms/signals';

@Component({
  standalone: true,
  selector: 'add',
  imports: [FormsModule, ButtonModule, SelectModule, InputNumberModule, FormField],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

   wasteTypes = [
    { label: 'Plastic', value: 'PLASTIC' },
    { label: 'Glass', value: 'GLASS' },
    { label: 'Bio', value: 'BIO' },
    { label: 'General', value: 'GENERAL' }
  ];

  containerModel = signal({
    wasteType: '',
    location: '',
    capacityKg: 0,
    currentFillLevelKg: 0
  });

  containerForm = form(this.containerModel, (f) => {
    required(f.wasteType);
    required(f.location);
    min(f.capacityKg, 0);
    min(f.currentFillLevelKg, 0);
  });

  createContainer() {
    const container = this.containerForm().value();
    console.log(container);
  }

  wasteTypeChange(event: any) {
    this.containerModel.update(model => ({ ...model, wasteType: event }));
  }
}
