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
    selector: 'app-signup',
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
  <form [formGroup]="signupForm" (ngSubmit)="onSubmit()" class="w-80" hlmCard>
    <div hlmCardHeader>
      <h3 hlmCardTitle>Sign-up</h3>
      <p hlmCardDescription>Use your email and password</p>
    </div>
    <p hlmCardContent>
        <label class="block" hlmLabel>Name</label>
        <input type="text" formControlName="name" class="mt-1.5 w-full" placeholder="Enter your full name" hlmInput />

        <label class="block" hlmLabel>Email</label>
        <input type="email" formControlName="email" class="mt-1.5 w-full" placeholder="Enter your email" hlmInput />

        <label class="block" hlmLabel>Password</label>
        <input type="password" formControlName="password" class="mt-1.5 w-full" placeholder="Enter your password" hlmInput />
    </p>
    <div hlmCardFooter class="block">
        <button class="w-full" type="submit" [disabled]="!signupForm.valid" hlmBtn>Sign-up</button>
    </div>
  </form>
  `,
})
export class SignupComponent {
    signupForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.signupForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit(): void {
        if (this.signupForm.valid) {
            const { email, password } = this.signupForm.value;
            console.log(`logged in ${email}`)
            // this.authService.login(username, password);
        }
    }
}