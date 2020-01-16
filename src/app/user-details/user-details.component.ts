import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {User} from '../user.model';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
  }

}
