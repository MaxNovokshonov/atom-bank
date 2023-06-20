import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  mobileMenuOpen = false;

  constructor(private authService: AuthService) {
  }

  openMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  isAuth() {
    return this.authService.isAuthenticated()
  }

  logout() {
    this.authService.logout()
  }
}
