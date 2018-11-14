import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { CartComponent } from './cart/cart.component';
import { CartHeaderComponent } from './cart-header/cart-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [HeaderComponent, FooterComponent, HomeComponent, CreateOrderComponent, CartComponent, CartHeaderComponent, OrderConfirmedComponent]
})
export class CustomerModule { }
