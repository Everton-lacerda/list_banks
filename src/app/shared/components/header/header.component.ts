import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit(this.isCollapsed);
  }

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
