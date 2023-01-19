import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core'
import {Router} from '@angular/router'

@Injectable()
export class AuthService{
    private user: User;
    public authChange = new Subject<boolean>();

    constructor(private router: Router){
        this.user = {
            email: "null",
            userId: "null",
            birthdate: new Date(),
            gender: "null"
        }
    }
    registerUser(authData: AuthData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random()*10000).toString(),
            gender: authData.gender,
            birthdate: authData.birthdate

        };
        this.authChange.next(true);
        this.router.navigate(['/training'])
    }

    login(authData: AuthData){
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random()*10000).toString(),
            gender: authData.gender,
            birthdate: authData.birthdate
        };
        this.authChange.next(true);
        this.router.navigate(['/training'])
    }

    logout(){
        this.user = {
            email: "null",
            userId: "null",
            gender: "null",
            birthdate: new Date()
        }
        this.authChange.next(false);
        this.router.navigate(['/login'])
    }

    isAuth(){
        return this.user.email != "null";
    }

    getUser(){
        return this.user;
    }
}