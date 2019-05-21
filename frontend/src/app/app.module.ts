import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FriendsComponent } from './friends/friends.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ReimbursementComponent } from './reimbursement/reimbursement.component';

import { ApiPrefixInterceptor } from './services';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    FriendsComponent,
    ExpensesComponent,
    ReimbursementComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
