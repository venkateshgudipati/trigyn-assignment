import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  DashboardComponent, FriendsComponent,ExpensesComponent,ReimbursementComponent} from './'

const routes: Routes = [
  {path:'dashboard', component: DashboardComponent},
  {path:'friends', component: FriendsComponent},
  {path:'expenses', component: ExpensesComponent},
  {path:'reimursement', component: ReimbursementComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
