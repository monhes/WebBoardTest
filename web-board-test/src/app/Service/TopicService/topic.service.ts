import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TopicMain } from 'src/app/Models/TopicMain';
import { TopicSub } from 'src/app/Models/TopicSub';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  //public localUrl: string = "https://localhost:7200/api/Topic";
  public localUrl: string = "https://thudentrylevel.azurewebsites.net/api/topic";

  constructor(private http:HttpClient) { }

  public createTopic(mainTopic: TopicMain[]){
    this.http.post(this.localUrl + "/CreateTopic",mainTopic).pipe().subscribe()
  }

  public addComment(subTopic: TopicSub[]){

  }
}
