import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransformersListComponent } from './transformers-list/transformers-list.component';
import { TransformerEditComponent } from './transformer-edit/transformer-edit.component';
import { RunSimulationComponent } from './run-simulation/run-simulation.component';

const routes: Routes = [
  { path: 'transformers', component: TransformersListComponent },
  { path: 'transformer/:id', component: TransformerEditComponent },
  { path: 'runsimulation', component: RunSimulationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
