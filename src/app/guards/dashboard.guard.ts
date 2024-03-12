import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const dashboardGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  if (!authService.isAuth()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
