import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Output() sidenavToggle = new EventEmitter<void>()
  isAuth = false;
  sub: Subscription;

  constructor(private authService: AuthService){
    this.sub = this.authService.authChange.subscribe(authStatus =>{
      this.isAuth = authStatus;
      });
  }

  ngOnInit(){
    this.sub = this.authService.authChange.subscribe(authStatus =>{
    this.isAuth = authStatus;
    });
  }

  onLogout(){
    this.authService.logout();
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
