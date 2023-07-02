import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavMenu } from '../../interfaces/nav-menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  mobileMenuOpen = false;

  navigation: NavMenu[] = [
    { title: 'Банкоматы', link: '/atm' },
    { title: 'Счета', link: '/accounts' },
    { title: 'Валюта', link: '/exchange' },
    { title: 'Выйти', link: '/authorization' },
  ];

  constructor(private authService: AuthService) {}

  openMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }
}
