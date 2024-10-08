import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WebcamModule } from 'ngx-webcam';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { CheckInComponent } from './check-in/check-in.component';
import { KaryawanComponent } from './karyawan/karyawan.component';
import { MapsComponent } from './maps/maps.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PresensiComponent } from './presensi/presensi.component';
import { WebcamComponent } from './webcam/webcam.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    KaryawanComponent,
    CheckInComponent,
    PresensiComponent,
    MapsComponent,
    WebcamComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    WebcamModule,
    GoogleMapsModule,
    LeafletModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
