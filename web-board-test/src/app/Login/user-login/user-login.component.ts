import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/Models/User';
import { LoggedinService } from 'src/app/Service/loggedin.service';
import { UserService } from 'src/app/Service/UserService/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userLoginInfo: FormGroup = this.fb.group({});
  userLoginValue: User[] = []

  userRegistinfo: FormGroup = this.fb.group({});
  userRegistValue: User[] = []

  constructor(private userServe: UserService,
    private fb:FormBuilder,
    private http:HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoggedinService
    ) { }

  ngOnInit(): void {
    this.userLoginInfo = this.fb.group({
      Name:['',[Validators.required]],
      Password:['',[Validators.required]]
    })

    this.userRegistinfo = this.fb.group({
      Name:['',[Validators.required]],
      Password:['',[Validators.required]]
    })
  }

  loggedin: Observable<any>|undefined

  login(){
     this.userLoginValue = []
     this.userLoginValue.push({id:undefined,name:this.userLoginInfo.value.Name,password:this.userLoginInfo.value.Password})
    
     this.http.post(this.userServe.localUrl + "/Login",this.userLoginValue).pipe().subscribe(response => {
        if(response == undefined)
        {
          confirm("username/password doesnt match")
        }else if(response != undefined){
          confirm("LoggedIn")
          this.loggedin = of(response)
          this.loggedin.subscribe(res=>{localStorage.setItem('username',res.name); localStorage.setItem('userId',res.id)})
          this.router.navigate(['/topiclist'])
        }
     })
     this.userLoginInfo.reset() 
  }

  regist(){
    this.userRegistValue = []
    this.userRegistValue.push({id:undefined,name:this.userRegistinfo.value.Name,password:this.userRegistinfo.value.Password})

    this.http.post(this.userServe.localUrl + "/RegistUser",this.userRegistValue).pipe().subscribe(response => {
        if(response == undefined)
        {
          confirm("UserName duplicate")
        }else if(response != undefined){
          confirm("Registed")
        }
      })
      this.userRegistinfo.reset()
    //this.userServe.regist(this.userRegistValue);
  }
}
