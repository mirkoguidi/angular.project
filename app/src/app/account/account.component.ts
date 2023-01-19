import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  onEditMode = false;
  user: User;

  constructor(private authService: AuthService){
    this.user = {
      email: "null",
      userId:"null",
      gender: "null",
      birthdate: new Date()
    }
  }

  ngOnInit(){
    this.user = this.authService.getUser();
  }

  onEdit(){
    this.onEditMode = true;
    console.log(this.user);
  }
}
