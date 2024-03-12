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
import { environment } from '../../environments/environment.development';

import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';


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
    <div class="h-full flex flex-col justify-center">
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
    </div>
  `,
})
export class SignupComponent {
    signupForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router) {
        this.signupForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit(): void {
        if (this.signupForm.valid) {
            const { name, email, password } = this.signupForm.value;
            let poolData = {
                UserPoolId: environment.userPoolId, // Your user pool id here
                ClientId: environment.clientId, // Your client id here
            };

            let userPool = new CognitoUserPool(poolData);

            let attributeList = [];

            let dataEmail = {
                Name: 'email',
                Value: email,
            }
            let dataName = {
                Name: 'name',
                Value: name,
            }

            attributeList.push(new CognitoUserAttribute(dataEmail));
            attributeList.push(new CognitoUserAttribute(dataName));
            userPool.signUp(email, password, attributeList, [], (err, result) => {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                    return;
                }
                let cognitoUser = result!.user;
                console.log(JSON.stringify(cognitoUser));
                this.router.navigate(['/login']);
            });

        }
    }
}