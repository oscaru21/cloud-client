import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../../environments/environment.development';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSig = signal<string | undefined | null>(undefined);

  isAuth(): boolean {
    let isAuth = false
    let poolData = {
      UserPoolId: environment.userPoolId, // Your user pool id here
      ClientId: environment.clientId, // Your client id here
    };

    let userPool = new CognitoUserPool(poolData);
    let currentUser = userPool.getCurrentUser();
    if (currentUser != null) {
      currentUser.getSession((err: any, session: any) => {
        if (err) {
          console.log(err);
        }
        isAuth = session.isValid();
      })
    }
    return isAuth;
  }
}