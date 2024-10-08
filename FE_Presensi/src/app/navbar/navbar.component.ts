import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  currentRoute: string = '';
  customerId: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  isCurrentRoute(routes: string[]): boolean {
    return routes.some(route => this.currentRoute.includes(route));
  }
}
