import { Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { HomeComponent } from './admin/home/home.component';

export const routes: Routes = [
    // { path: '**', component } // Unknown Route
    { path: 'admin/login', component: LoginComponent },
    { path: 'admin', component: HomeComponent },
];
