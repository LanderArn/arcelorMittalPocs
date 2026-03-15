import { Component, input } from '@angular/core';

import { TableModule } from 'primeng/table';

export type AmTableColumn<T> = {
  key: Extract<keyof T, string>;
  label: string;
};

@Component({
  selector: 'am-table',
  imports: [TableModule],
  templateUrl: './am-table.component.html',
  styleUrls: ['./am-table.component.scss'],
  standalone: true,
})
export class AmTableComponent<T> {
  readonly data = input.required<T[]>();
  readonly columns = input<AmTableColumn<T>[]>();
}
