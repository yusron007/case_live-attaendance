import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresensiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  checkIn(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/presensi/checkin`, data);
  }

  getPresensi(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/presensi`);
  }

  checkOut(nik: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/presensi/checkout/${nik}`, {});
  }
}
