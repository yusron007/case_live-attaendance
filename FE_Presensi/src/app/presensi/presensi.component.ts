import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar untuk notifikasi
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PresensiService } from '../service/presensi.service';

interface Presensi {
  nik: string;
  nama: string;
  check_in: string;
  check_out: string;
  tipe_presensi_id: number;
  image: string | null;
}

@Component({
  selector: 'app-presensi',
  templateUrl: './presensi.component.html',
  styleUrls: ['./presensi.component.css']
})
export class PresensiComponent implements OnInit, AfterViewInit {

  presensis: Presensi[] = [];
  displayedColumns: string[] = ['nik', 'nama', 'check_in', 'check_out', 'absen', 'image', 'action'];
  dataSource = new MatTableDataSource<Presensi>();

  searchKey: string = '';
  totalElements = 0;

  constructor(private router: Router, private presensiService: PresensiService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchPresensis();
  }

  ngAfterViewInit(): void {
    // Implement if you need any logic after view initialization
  }

  fetchPresensis(): void {
    this.presensiService.getPresensi().subscribe(response => {
      if (response && response.data) {
        this.presensis = response.data.map((item: any) => ({
          nik: item.nik,
          nama: item.nama,
          check_in: item.check_in,
          check_out: item.check_out,
          tipe_presensi_id: this.getAbsenStatus(item.tipe_presensi_id),
          image: item.image
        }));
        this.dataSource.data = this.presensis;
        this.totalElements = response.data.length;
      }
    });
  }

  getAbsenStatus(tipe_presensi_id: number): string {
    switch (tipe_presensi_id) {
      case 1:
        return 'On-Time';
      case 2:
        return 'Sick';
      case 3:
        return 'Permisiion';
      case 4:
        return 'Let';
      default:
        return 'Unknown';
    }
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Presensi, filter: string) => data.nama.toLowerCase().includes(filter);
  }

  checkOut(nik: string): void {
    this.presensiService.checkOut(nik).subscribe(
      (response) => {
        alert(`Check-Out successful for NIK: ${nik}`);
        this.fetchPresensis();
      },
      (err) => {
        let errorMessage = `Failed to check-out for NIK: ${nik}`;

        if (err.error && err.error.message) {
          errorMessage = err.error.error;
        }

        alert(errorMessage);
        console.error('Error:', err);
      }
    );
  }

  navigateToCheckIn(): void {
    this.router.navigate(['presensi/check-in']);
  }
}
