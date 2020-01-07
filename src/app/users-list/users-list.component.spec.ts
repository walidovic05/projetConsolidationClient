import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import { UsersListComponent } from './users-list.component';
import {UsersService} from '../users.service';
import {Observable} from 'rxjs';
import {element} from 'protractor';


describe('UsersListComponent', () => {
  let usersListComponent: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let usersService: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ UsersListComponent ],
      providers: [UsersService]
    })
      .compileComponents();
    fixture = TestBed.createComponent(UsersListComponent);
    usersListComponent = fixture.componentInstance;
    usersService = TestBed.get(UsersService);

  });

  it('should create users list component', () => {
    expect(usersListComponent).toBeTruthy();
  });

  it(`should have as users list defined`, () => {
    expect(usersListComponent.usersList).toBeDefined()
    expect(usersListComponent.usersList.length).toEqual(0);

    let spy = spyOn(usersService,'getUsers').and.returnValue(Observable.create(usersListComponent.usersList))
    usersListComponent.ngOnInit();


    spy.calls.mostRecent().returnValue.subscribe((done)=> {
      fixture.detectChanges();
      expect(usersListComponent.usersList.length).toEqual(1);
      done();
    })
  });

});
