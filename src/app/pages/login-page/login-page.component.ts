import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponse, User } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { merge, Subscription } from 'rxjs';
import { LoginError } from '../../interfaces/login-error';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  authForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  errorSubscription = new Subscription();

  errorMessage = '';

  get login() {
    return this.authForm.controls.login as FormControl;
  }

  get password() {
    return this.authForm.controls.password as FormControl;
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.logout();
    this.errorSubscription.add(
      merge(this.login.valueChanges, this.password.valueChanges).subscribe(() => this.clearError()),
    );
  }

  private setToken(response: AuthResponse) {
    if (response?.payload != null) {
      this.authService.setToken(response.payload.token);
    } else {
      this.errorMessage = this.getErrorMessage(response.error);
      this.authService.logout();
    }
  }

  getErrorMessage(error: string): string {
    switch (error) {
      case LoginError.NO_SUCH_USER:
        return 'Пользователь не найден';
      case LoginError.INVALID_PASSWORD:
        return 'Неверный пароль';
      default:
        return 'Неизвестная ошибка';
    }
  }

  clearError() {
    this.errorMessage = '';
  }

  submit() {
    if (this.authForm.invalid) {
      return;
    }

    const user: User = {
      login: this.authForm.value.login || '',
      password: this.authForm.value.password || '',
    };

    this.authService.login(user).subscribe((response) => {
      this.authForm.reset();
      this.clearError();
      this.setToken(response);
      this.router.navigate(['accounts']);
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
