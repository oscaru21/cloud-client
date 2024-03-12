import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardGuard } from './guards/dashboard.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route redirects to Home
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [loginGuard] },
    { path: 'create', component: FormComponent, canActivate: [dashboardGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [dashboardGuard] },
];
