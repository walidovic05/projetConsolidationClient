import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../user.model';
import {UsersService} from '../users.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  usersList = [];
  dtOptions = {};
  @ViewChild('f', { static: false }) slForm: NgForm;
  userToAdd: User = new class implements User {
    createdAt: Date;
    date_de_naissance: string = "";
    email: string ="";
    id: number;
    nom: string ="";
    prenom: string = "";
  };

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
  }

  onAddUser() {
    this.userToAdd.date_de_naissance =  new Date(this.userToAdd.date_de_naissance).toLocaleDateString();
    this.usersService.addUser(this.userToAdd).subscribe((res)=> { this.usersList.push(
      { id: res.id,
        nom: res.nom,
        prenom: res.prenom,
        email: res.email,
        date_de_naissance: new Date(res.date_de_naissance).toLocaleDateString(),
        createdAt: new Date()
      })})
  }
}
