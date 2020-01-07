import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public GLOBAL_URI = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.GLOBAL_URI + '/users')
      .pipe(map(response => { return response['content']}));
  }
}
