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
      birthDate: new Date(1930, 2, 1),
      createdAt: new Date(2019, 2, 1)
    }, {
      id: 2004,
      nom: 'Amar',
      prenom: 'salah',
      email: 'salah.amar@gmail.com',
      birthDate: new Date(1940, 2, 1),
      createdAt: new Date(2019, 4, 1)
    }];
    const service: UsersService = TestBed.get(UsersService);
    service.getUsers().pipe(map(response => response['content'])).subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });
    const request = httpMock.expectOne( `${service.GLOBAL_URI}/users`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyUsers);
  });

  afterEach(() => {
    httpMock.verify();
  });
});