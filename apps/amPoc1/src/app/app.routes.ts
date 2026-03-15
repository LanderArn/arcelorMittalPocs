import { Route } from '@angular/router';
import { ManagementComponent } from '@arcelor-mittal-pocs/management';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ManagementComponent,
  },
  {
    path: 'add',
    loadComponent: () =>
      import('@arcelor-mittal-pocs/management').then(m => m.AddComponent),
  },
];
