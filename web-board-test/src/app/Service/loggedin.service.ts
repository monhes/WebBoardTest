import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedinService {

  constructor(private router: Router,private route: ActivatedRoute) { }
 

  checkLogin(){
    const userId = localStorage.getItem('userId') 
    if(userId == undefined){
      this.gotologinPage()
      return false
    }
    return true
  }

  gotologinPage(){
    this.router.navigate(['/'])
  }
}
