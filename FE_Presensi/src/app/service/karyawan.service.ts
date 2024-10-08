import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class KaryawanService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getKaryawan(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/karyawan`);
  }

}
