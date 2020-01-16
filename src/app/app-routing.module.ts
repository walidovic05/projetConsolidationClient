import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersListComponent} from './users-list/users-list.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UserResolverService} from './user-resolver.service';


const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full'},
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: UserDetailsComponent, resolve: { user: UserResolverService }},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
