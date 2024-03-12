import { Component, inject } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, HlmButtonDirective],
  template: `
    <div class="flex flex-row justify-between items-center">
      <button routerLink="/home" class="text-foreground" >
        <img src="/assets/logo.png" alt="logo" class="w-8 h-8" />
      </button>
      
      <div *ngIf="!authService.isAuth()" class="grid grid-cols-2 gap-2">
        <a routerLink="/login" variant='outline' hlmBtn>Login</a>
        <a routerLink="/signup" hlmBtn>Sign-up</a>
      </div>
      <div *ngIf="authService.isAuth()">
        <span (click)="logout()" variant='outline' hlmBtn>Logout</span>
      </div>
</div>
  `,
  styles: ``
})
export class NavbarComponent {
  authService = inject(AuthService);

  constructor(private router: Router) { }

  logout(): void {
    let poolData = {
      UserPoolId: environment.userPoolId, // Your user pool id here
      ClientId: environment.clientId, // Your client id here
    };

    let userPool = new CognitoUserPool(poolData);
    let currentUser = userPool.getCurrentUser();
    currentUser!.signOut();
    this.authService.currentUserSig.set(null);
    this.router.navigate(['/home']);
  }
}
