import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public GLOBAL_URI = 'http://localhost:8080/api/v1';
  public GLOBAL_URI_V2 = 'http://localhost:8080/api/v2';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.GLOBAL_URI + '/users')
      .pipe(map(response => { return response['content']}));
  }

  deleteSpecificUser(userId: number){
    return this.http.delete(this.GLOBAL_URI + '/user/' + userId);
  }

  getSpecificUser(userId: string) {
    return this.http.get<User>(this.GLOBAL_URI + '/users/' + userId);
  }

  updateUser(user: User){
    return this.http.put(this.GLOBAL_URI_V2 + "/user/" + user.id, user, { headers: {'Content-Type':'application/json', 'charset':'utf-8'}});
  }

}
