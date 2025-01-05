import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() isCollapsed = false;
  @Output() toggle = new EventEmitter<boolean>();

  private authService = inject(AuthService);
  private router = inject(Router);

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit(this.isCollapsed);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
