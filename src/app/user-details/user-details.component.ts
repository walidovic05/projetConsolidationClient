import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

import {User} from '../user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  toUpdate: boolean = true;
  @ViewChild('f', { static: false }) slForm: NgForm;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
  }

  onSubmit(form: NgForm){
    console.log(form.value.nom);
  }

  activateUpdateMode() {
    this.toUpdate = !this.toUpdate;
  }
}
