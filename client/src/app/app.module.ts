import { SurveyService } from './survey.service';
import { AuthService } from './auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { ListPollsComponent } from './list-polls/list-polls.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { SurveyComponent } from './survey/survey.component';
import { HomeComponent } from './home/home.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPollsComponent,
    CreatePollComponent,
    SurveyComponent,
    HomeComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CookieModule.forRoot()
  ],
  providers: [AuthService, SurveyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
