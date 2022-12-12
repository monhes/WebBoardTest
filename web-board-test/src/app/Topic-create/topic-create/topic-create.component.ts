import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TopicMain } from 'src/app/Models/TopicMain';
import { TopicService } from 'src/app/Service/TopicService/topic.service';

@Component({
  selector: 'app-topic-create',
  templateUrl: './topic-create.component.html',
  styleUrls: ['./topic-create.component.css']
})
export class TopicCreateComponent implements OnInit {

  topicInfo:FormGroup = this.fb.group({})
  topicValue:TopicMain[] = []
  constructor(private fb: FormBuilder,private topicService:TopicService,private http: HttpClient,
    private router:Router) { }

  ngOnInit(): void {
    this.topicInfo = this.fb.group({
      Header:['',Validators.required],
      Content:['',Validators.required],
    })
  }

  createTopic(){ 
    this.topicValue = []
    localStorage.setItem('username',"1")
    var userId:number
    const localId = localStorage.getItem('userId')
    
    if(localId != undefined){
      console.warn("in if")
      userId = +localId

      this.topicValue.push({Id:undefined,
        Header:this.topicInfo.value.Header,
        Content:this.topicInfo.value.Content,
        Date:undefined,
        IdUser:userId
      })
      console.warn(this.topicValue)
    }console.warn("out if") 

    this.http.post(this.topicService.localUrl + "/CreateTopic",this.topicValue).subscribe()
    this.router.navigate(['/topiclist'])
    this.topicInfo.reset()
    //this.topicService.createTopic(this.topicValue)
  }
}
