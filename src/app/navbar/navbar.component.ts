import { Component, inject } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, HlmButtonDirective],
  template: `
    <div class="flex flex-row justify-between items-center">
      <button routerLink="/home" class="text-foreground" >
        logo
      </button>
      
      <div *ngIf="authService.currentUserSig() === null" class="grid grid-cols-2 gap-2">
        <a routerLink="/login" variant='outline' hlmBtn>Login</a>
        <a routerLink="/signup" hlmBtn>Sign-up</a>
      </div>
      <div *ngIf="authService.currentUserSig()">
        <span (click)="logout()" variant='outline' hlmBtn>Logout</span>
      </div>
</div>
  `,
  styles: ``
})
export class NavbarComponent {
  authService = inject(AuthService);

  logout(): void {
    console.log('logout');
    localStorage.setItem('token', '');
    this.authService.currentUserSig.set(null);
  }
}
