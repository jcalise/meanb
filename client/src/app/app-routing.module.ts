import { SearchComponent } from './search/search.component';
import { SurveyComponent } from './survey/survey.component';
import { ListPollsComponent } from './list-polls/list-polls.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'create', pathMatch: 'full', component: CreatePollComponent},
  {path: 'list', pathMatch: 'full', component: ListPollsComponent},
  {path: 'single/:id', component: SurveyComponent},
  {path: 'vote/:id/:option', component: SurveyComponent},
  {path: 'delete/:id', component: ListPollsComponent},
  {path: 'search/:term', component: SearchComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login/:username', redirectTo: 'list'},
  {path: 'logout', redirectTo: 'home'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
