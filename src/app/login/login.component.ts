import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log(`logged in ${email}`)
      // this.authService.login(username, password);
    }
  }
}