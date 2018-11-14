import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { IngredientManagementComponent } from './ingredient-management/ingredient-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OrderManagementComponent } from './order-management/order-management.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent,
    HomeComponent,
    IngredientManagementComponent,
    UserManagementComponent,
    HeaderComponent,
    FooterComponent,
    OrderManagementComponent],
  exports: [LoginComponent]
})
export class AdminModule { }
