import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth.service';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  authService = inject(AuthService);
  // http = inject(HttpClient);

  ngOnInit(): void {
    this.authService.currentUserSig.set({
      name: 'Oscar',
      email: 'test@test.com',
      token: "fake-token"
    });
    console.log(this.authService.currentUserSig())
    // this.http
    //   .get<{ user: User }>('https://api.realworld.io/api/user')
    //   .subscribe({
    //     next: (response) => {
    //       console.log('response', response);
    //       this.authService.currentUserSig.set(response.user);
    //     },
    //     error: () => {
    //       this.authService.currentUserSig.set(null);
    //     },
    //   });
  }
}
