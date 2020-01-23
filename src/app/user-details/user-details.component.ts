import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import {User} from '../user.model';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  toUpdate: boolean = true;
  @ViewChild('f', { static: false }) slForm: NgForm;
  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
  }

  onSubmit(){
    this.user.date_de_naissance =  new Date(this.user.date_de_naissance).toLocaleDateString();
    this.usersService.updateUser(this.user).subscribe(() => this.router.navigate(["../"], { relativeTo: this.route }))
  }

  activateUpdateMode() {
    this.toUpdate = !this.toUpdate;
  }
}
