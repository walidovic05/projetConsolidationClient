import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {User} from './user.model';
import {UsersService} from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User> {

  constructor(private usersService: UsersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    return this.usersService.getSpecificUser(route.paramMap.get('id'));
  }
}
