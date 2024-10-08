import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { KaryawanService } from '../service/karyawan.service';

interface Karyawan {
  nik: string;
  nama: string;
  unit_kerja: string;
  status_karyawan: boolean;
}

@Component({
  selector: 'app-karyawan',
  templateUrl: './karyawan.component.html',
  styleUrls: ['./karyawan.component.css']
})

export class KaryawanComponent implements OnInit, AfterViewInit {

  karyawans: Karyawan[] = [];
  displayedColumns: string[] = ['nik', 'nama', 'unit_kerja', 'status_karyawan', 'action'];
  dataSource = new MatTableDataSource<Karyawan>();

  searchKey: string = '';
  totalElements = 0;

  constructor(private router: Router, private karyawanService: KaryawanService) { }

  ngOnInit(): void {
    this.fetchKaryawans();
  }

  ngAfterViewInit(): void {
    // Implement if you need any logic after view initialization
  }

  fetchKaryawans(): void {
    this.karyawanService.getKaryawan().subscribe(response => {
      if (response && response.data) {
        this.karyawans = response.data.map((item: any) => ({
          nik: item.nik,
          nama: item.nama,
          unit_kerja: item.unit_kerja,
          status_karyawan: item.status_karyawan
        }));
        this.dataSource.data = this.karyawans;
        this.totalElements = response.data.length;
      }
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Karyawan, filter: string) => data.nama.toLowerCase().includes(filter);
  }

  navigateToAddCustomer(): void {
    this.router.navigate(['karyawan/add']);
  }

  editCustomer(customerId: string): void {
    this.router.navigate(['customer/edit-customer', customerId]);
  }

  // deleteCustomer(customerId: string): void {
  //   this.customerService.deleteCustomer(customerId).subscribe(
  //     response => {
  //       console.log('Customer deleted:', response);
  //       this.dataSource.data = this.dataSource.data.filter(customer => customer.id !== customerId);
  //     },
  //     error => {
  //       console.error('Error deleting customer:', error);
  //     }
  //   );
  // }

  viewCustomer(customerId: string): void {
    this.router.navigate(['customer/detail-customer', customerId]);
  }
}
