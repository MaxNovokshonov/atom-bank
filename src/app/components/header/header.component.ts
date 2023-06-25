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

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
  isAuth() {
    return this.authService.isAuthenticated()
  }

  logout() {
    this.mobileMenuOpen = false;
    this.authService.logout()
  }
}
