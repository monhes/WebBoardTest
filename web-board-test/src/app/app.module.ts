import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './Login/user-login/user-login.component';
import { TopicContentComponent } from './Topic-content/topic-content/topic-content.component';
import { TopicCreateComponent } from './Topic-create/topic-create/topic-create.component';
import { TopicListComponent } from './Topic-list/topic-list/topic-list.component';
import { UserRegistComponent } from './Regist/user-regist/user-regist.component';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    TopicContentComponent,
    TopicCreateComponent,
    TopicListComponent,
    UserRegistComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path:'',component: UserLoginComponent},
      {path:'topiclist',component: TopicListComponent},
      {path:'topiccreate',component:TopicCreateComponent},
      {path:'topiccontent/:TopicId',component:TopicContentComponent} 
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
