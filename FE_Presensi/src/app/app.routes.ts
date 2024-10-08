import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckInComponent } from './check-in/check-in.component';
import { KaryawanComponent } from './karyawan/karyawan.component';
import { PresensiComponent } from './presensi/presensi.component';

export const routes: Routes = [
  { path: '', redirectTo: '/karyawan', pathMatch: 'full' },
  { path: 'karyawan', component: KaryawanComponent},
  { path: 'karyawan/add', component: KaryawanComponent},
  { path: 'presensi', component: PresensiComponent},
  { path: 'presensi/check-in', component: CheckInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

