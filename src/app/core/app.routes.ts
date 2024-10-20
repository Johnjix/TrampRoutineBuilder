import { Routes } from '@angular/router';
import { RoutineBuilderComponent } from '../features/components/routine-builder/routine-builder.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'routine-builder',
    pathMatch: 'full',
  },
  {
    path: 'routine-builder',
    component: RoutineBuilderComponent,
  },
];
