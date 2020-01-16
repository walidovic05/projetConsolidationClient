import { TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {map} from 'rxjs/operators';

import { UsersService } from './users.service';
import {User} from './user.model';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [UsersService]
    });
    service = TestBed.get(UsersService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users when GET request /users is called', () => {
    const dummyUsers: User[] = [{
      id: 2004,
      nom: 'bizid',
      prenom: 'Ali',
      email: 'ali.bizid@gmail.com',
      date_de_naissance: new Date(1930, 2, 1),
      createdAt: new Date(2019, 2, 1)
    }, {
      id: 2004,
      nom: 'Amar',
      prenom: 'salah',
      email: 'salah.amar@gmail.com',
      date_de_naissance: new Date(1940, 2, 1),
      createdAt: new Date(2019, 4, 1)
    }];
    //const service: UsersService = TestBed.get(UsersService);
    service.getUsers().pipe(map(response => response['content'])).subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });
    const request = httpMock.expectOne( `${service.GLOBAL_URI}/users`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyUsers);
  });

  // it('should delete a user when DELETE request with specific user id', () => {
  //   //const request = httpMock.expectOne( `${service.GLOBAL_URI}/users/2004`);
  //   service.deleteSpecificUser(2004).subscribe(response => {
  //     //expect(request.request.method).toBe('DELETE');
  //     expect(response.toString()).toBe("user deleted successfully");
  //   })
  // });

  afterEach(() => {
    httpMock.verify();
  });
});
