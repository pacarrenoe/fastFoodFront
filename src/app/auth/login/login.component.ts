import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private loaderService: LoaderService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  hidePassword = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  login(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.loaderService.show(); // ✅ Muestra el loader manualmente

    this.authService.login(email, password).subscribe({
      next: () => {
        this.loaderService.hide(); // ✅ Oculta cuando termina
      },
      error: (err) => {
        this.toastr.error(err.message || 'Error al iniciar sesión');
        this.loaderService.hide(); // ✅ También oculta en error
      }
    });
  }
}
