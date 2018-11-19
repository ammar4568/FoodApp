import { Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { HomeComponent } from './admin/home/home.component';
import { HomeComponent as HomeComponentCustomer } from './customer/home/home.component';
import { CreateOrderComponent } from './customer/create-order/create-order.component';
import { CartComponent } from './customer/cart/cart.component';
import { OrderConfirmedComponent } from './customer/order-confirmed/order-confirmed.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
    // { path: '**', component } // Unknown Route
    { path: 'admin/login', component: LoginComponent },
    { path: 'admin', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponentCustomer },
    { path: 'order', component: CreateOrderComponent },
    { path: 'cart', component: CartComponent },
    { path: 'thankyou', component: OrderConfirmedComponent }
];
