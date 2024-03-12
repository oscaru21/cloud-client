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

  ngOnInit(): void {
  }
}
