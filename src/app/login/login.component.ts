import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,
    ReactiveFormsModule
  ],
  template: `
  <div class="h-full flex flex-col justify-center">

    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="w-80" hlmCard>
      <div hlmCardHeader>
        <h3 hlmCardTitle>Login</h3>
        <p hlmCardDescription>Use your email and password</p>
      </div>
      <p hlmCardContent>
          <label class="block" hlmLabel>Email</label>
          <input type="email" formControlName="email" class="mt-1.5 w-full" placeholder="Enter your email" hlmInput />
          <label class="block" hlmLabel>Password</label>
          <input type="password" formControlName="password" class="mt-1.5 w-full" placeholder="Enter your password" hlmInput />
      </p>
      <div hlmCardFooter class="block">
          <button class="w-full" type="submit" [disabled]="!loginForm.valid" hlmBtn>Login</button>
      </div>
    </form>
  </div>
  `,
})
export class LoginComponent {
  loginForm: FormGroup;
  authService = inject(AuthService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      let poolData = {
        UserPoolId: environment.userPoolId, // Your user pool id here
        ClientId: environment.clientId, // Your client id here
      };

      let userPool = new CognitoUserPool(poolData);

      let userData = {
        Username: email,
        Pool: userPool,
      }

      let authData = {
        Username: email,
        Password: password,
      }
      let cognitoUser = new CognitoUser(userData);
      let authenticationDetails = new AuthenticationDetails(authData);
      //login
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log();
          this.router.navigate(['/dashboard']);
        },
        onFailure: (err) => {
          console.log(err);
        }
      })

    }
  }
}