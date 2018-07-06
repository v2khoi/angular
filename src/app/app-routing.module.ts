import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MasterComponent } from './master/master.component';

const routes: Routes = [
  { path: 'lists', component: ListsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: MasterComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
