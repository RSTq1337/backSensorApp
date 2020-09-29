import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { AddSensorComponent } from './add-sensor/add-sensor.component';

const routes: Routes = [
  { path: '', redirectTo: 'view-sensor', pathMatch: 'full' },
  { path: 'view-sensor', component: SensorListComponent },
  { path: 'add-sensor', component: AddSensorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
