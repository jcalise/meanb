import { Router, ActivatedRoute } from '@angular/router';
import { SurveyService } from './../survey.service';
import { Survey } from './../survey';
import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-search',
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  surveys: Survey[] = [];
  location: Location;

  constructor(private _surveyService: SurveyService,
    private router: Router,
    private route: ActivatedRoute,
    location: Location) { }

  ngOnInit() {
    const term = location.pathname.split('/')[2];
    this._surveyService.surveyObserver.subscribe(
      surveys => this.surveys = surveys
    );
    this._surveyService.searchResults(term);
  }

}
