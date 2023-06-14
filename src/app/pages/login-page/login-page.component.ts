import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthResponse, User} from "../../interfaces/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  authForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  errorMessage = ''

  get login() {
    return this.authForm.controls.login as FormControl;
  }

  get password() {
    return this.authForm.controls.password as FormControl;
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  private setToken(response: AuthResponse | null) {
    if (response?.payload != null) {
      localStorage.setItem('token', response.payload.token);
    } else {
      switch (response?.error) {
        case 'No such user':
          this.errorMessage = 'Пользователь не найден'
          break;
        case 'Invalid password':
          this.errorMessage = 'Неверный пароль'
          break;
        default:
          this.errorMessage = ''
      }
      localStorage.clear()
    }
  }

  clearError() {
    this.errorMessage = ''
  }

  submit() {

    if (this.authForm.invalid) {
      return;
    }

    const user: User = {
      login: this.authForm.value.login!,
      password: this.authForm.value.password!
    }

    this.authService.login(user).subscribe((response) => {
      this.authForm.reset();
      this.errorMessage = ''
      this.setToken(response)
      this.router.navigate(['accounts']);
    })
  }
}
