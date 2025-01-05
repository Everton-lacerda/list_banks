import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username!: string;
  password!: string;
  isLoading = false;

   private router = inject(Router);
   private toastr = inject(ToastrService);
   private authService = inject(AuthService);

  login() {
    this.isLoading = true;
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.router.navigate(['/bank/list']);
      },
      (error: any) => {
        this.isLoading = false;
        this.toastr.error('Usuário ou senha inválidos!', 'Erro');
        console.error('Erro no login', error);
      }
    );
  }
}
