import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'nmo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  year!: number;
  page!: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.year = new Date().getFullYear();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/login') {
          this.page = 'login';
        } else {
          this.page = event.url.replace('/', '').split('?')[0];
        }
      }
    });
  }
}
