import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //public localUrl: string = "https://localhost:7200/api/Topic";
  public localUrl: string = "https://thudentrylevel.azurewebsites.net/api/topic";
  temp:any
  constructor(private http:HttpClient) { }

  public login(user: User[]):any{ 
    this.http.post(this.localUrl + "/Login",user).pipe().subscribe()
  }

  public regist(user: User[]){
    console.log("regist "+ JSON.stringify(user))
    this.http.post(this.localUrl + "/RegistUser",user).pipe().subscribe(response => {console.log("return " + JSON.stringify(response))})
    
  }
}
