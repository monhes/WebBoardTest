import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Comments } from 'src/app/Models/Comments';
import { Topic } from 'src/app/Models/Topic';
import { TopicList } from 'src/app/Models/TopicList';
import { TopicSub } from 'src/app/Models/TopicSub';
import { TopicService } from 'src/app/Service/TopicService/topic.service';

@Component({
  selector: 'app-topic-content',
  templateUrl: './topic-content.component.html',
  styleUrls: ['./topic-content.component.css']
})
export class TopicContentComponent implements OnInit {

  SelectedTopic:Observable<TopicList[]>|undefined
  topicId:number = 0

  DisplayTopic:Observable<any>|undefined
  DisplayComments:Observable<any>|undefined

  commentInfo:FormGroup = this.fb.group({})
  commentValue:TopicSub[] = []

  constructor(private fb: FormBuilder,private http: HttpClient,private route: ActivatedRoute,private topServe:TopicService,
    private router: Router) { }

  ngOnInit(): void {
    this.commentInfo = this.fb.group({
      IdUser:[''],
      IdTopicMain:[''],
      Comment:['',Validators.required]
    }) 
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('TopicId'));
    this.topicId = productIdFromRoute
    this.getTopic(productIdFromRoute)
    
  }

  submitComment(){ 
    const routeParams = this.route.snapshot.paramMap;
    const topicIdFromRoute = Number(routeParams.get('TopicId'));

    const tempIdUser = localStorage.getItem('userId')
    var idU:number = 0
    
    const tempNameUser = localStorage.getItem('username')
    var nameU:string = '' 

    if(tempIdUser != undefined){
      idU = +tempIdUser
    }
    if(tempNameUser != undefined){
      nameU = tempNameUser
    }

    this.commentValue.push({IdUser:idU,IdTopicMain:topicIdFromRoute,Comment:this.commentInfo.value.Comment,UserName:nameU}) 
 
    this.http.post(this.topServe.localUrl + '/AddComment', this.commentValue).subscribe(res=>{this.DisplayComments = of(res)})
    this.commentInfo.reset()
  }

  getTopic(id:number){ 
    this.http.post(this.topServe.localUrl + '/GetOneTopic', {Id:id}).subscribe(res=>{this.DisplayTopic = of(res)})
    this.http.post(this.topServe.localUrl + '/GetComments', {Id:id}).subscribe(res=>{this.DisplayComments = of(res)})
  }

  go(){
    this.router.navigate(['/login']);
  }

}
