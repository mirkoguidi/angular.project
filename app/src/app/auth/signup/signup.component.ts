import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  maxDate;

  constructor(private authService: AuthService){
    this.maxDate = new Date();
  }
  ngOnInit(){
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
      gender: form.value.gender,
      birthdate: form.value.birthdate
    });
  }
}
