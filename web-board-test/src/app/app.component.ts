import { Component } from '@angular/core';
import { LoggedinService } from './Service/loggedin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-board-test';
  LoggedIn:boolean = false
  constructor(private loginService:LoggedinService){}
  logout(){
    localStorage.clear()
    this.LoggedIn = this.loginService.checkLogin() 
  }
}
