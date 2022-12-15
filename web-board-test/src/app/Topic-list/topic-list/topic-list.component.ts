import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TopicList } from 'src/app/Models/TopicList';
import { TopicService } from 'src/app/Service/TopicService/topic.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  TopicList:Observable<TopicList[]>|undefined

  constructor(private http:HttpClient,private topServe:TopicService,
    private router: Router,
    private route: ActivatedRoute,) { }


  ngOnInit(): void {
    this.getTopic()
  }

  getTopic(){
    this.http.get<any>(this.topServe.localUrl + '/GetTopics').subscribe(res=>{this.TopicList = of(res)})
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/'])
  }
}
