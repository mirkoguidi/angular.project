import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree} from '@angular/router'
import {Injectable} from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad{

    constructor(private authService: AuthService, private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.authService.isAuth()){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
    canLoad(route: Route): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.authService.isAuth()){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}