import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService){}

  onSubmit(form: NgForm){
    this.authService.login({
      email: form.value.email,
      password: form.value.password,
      gender: form.value.gender,
      birthdate: form.value.birthdate
    });
  }


}
