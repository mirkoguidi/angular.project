import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {
  @Output() clickList = new EventEmitter<void>();
  isAuth = false;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.authChange.subscribe(status => {
      this.isAuth = status;
    });
  }  
  onClose(){
    this.clickList.emit();
  }

  onLogout(){
    this.authService.logout();
    this.onClose();
  }

  ngOnDestroy(){
    this.authService.authChange.unsubscribe();
  }

}
