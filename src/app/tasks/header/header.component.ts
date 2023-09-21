import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private auth: AuthService,
    private location: Location
  ) {}

  user() {
    this.router.navigate(['config']);
  }

  logout() {
    this.auth.logout().then(() => {});
  }
}
