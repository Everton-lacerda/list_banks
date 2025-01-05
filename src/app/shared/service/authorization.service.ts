import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private roleMap: { [key: string]: () => boolean } = {
    'ROLE_BANCO_LST': () => this.isNormalUser(),
    'ROLE_BANCO_ADD': () => this.isAdmin(),
    'ROLE_BANCO_EDT': () => this.isAdmin(),
    'ROLE_BANCO_DEL': () => this.isAdmin(),
  };

  private authService = inject(AuthService);

  hasRole(role: string): boolean {
    const roles = this.authService.getUserRoles();
    return roles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    const userRoles = this.authService.getUserRoles();
    return roles.some((role) => userRoles.includes(role));
  }

  isAdmin(): boolean {
    const roles = this.authService.getUserRoles();
    return roles.some((role) => role !== 'ROLE_BANCO_LST');
  }

  isNormalUser(): boolean {
    const roles = this.authService.getUserRoles();
    return roles.includes('ROLE_BANCO_LST') && roles.length === 1;
  }

  checkRole(role: string): boolean {
    return this.roleMap[role] ? this.roleMap[role]() : false;
  }
}
