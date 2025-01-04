import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/service/auth.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  // constructor(
  //   private fb: FormBuilder,
  //   private authService: AuthService,
  //   private router: Router
  // ) {
  //   this.loginForm = this.fb.group({
  //     username: ['', [Validators.required]],
  //     password: ['', [Validators.required]],
  //   });
  // }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     const { username, password } = this.loginForm.value;
  //     this.authService.login(username, password).subscribe(() => {
  //       this.router.navigate(['/banco-lista']);
  //     });
  //   }
  // }
}
