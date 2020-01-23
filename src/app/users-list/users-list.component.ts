import { Component, OnInit } from '@angular/core';
import {User} from '../user.model';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  usersList = [];
  dtOptions = {};
  constructor(private usersService : UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(users => {
      this.usersList.push(...users);
    });
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  toDeleteUser(id: number, index: number) {
    console.log(id);
    this.usersService.deleteSpecificUser(id).subscribe(res => {
      this.usersList =  this.usersList.filter(user => user.id != id);
    });
    console.log("users List"+ this.usersList);
  }
}
