import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isSidebarCollapsed = false;
  isLoginPage: boolean = false;

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url.includes('/login');
    });
  }

  onToggleSidebar(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
