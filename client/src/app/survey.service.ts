import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/rx';
import { Survey } from './survey';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class SurveyService {
  surveyObserver = new BehaviorSubject([]);

  constructor(private _http: Http) { }

  retrieveAll() {
    this._http.get('/list').subscribe(
      surveys => this.surveyObserver.next(surveys.json()),
      errorResponse => console.log(errorResponse)
    );
  }

  searchResults(term: string) {
    this._http.get(`/search/${term}`).subscribe(
      surveys => this.surveyObserver.next(surveys.json()),
      errorResponse => console.log(errorResponse)
    );
  }

  createSurvey(survey: Survey) {
    this._http.post('/insert', survey).subscribe(
      response => this.retrieveAll(),
      errorResponse => console.log(errorResponse)
    );
  }

  getOne(id: string): Observable<Survey> {
    return this._http.get(`/single/${id}`)
    .map(response => response.json());
  }

  vote(id: string, option: number) {
    return this._http.get(`/vote/${id}/${option}`)
    .map(response => response.json());
  }

  delete(id: string) {
    return this._http.get(`/delete/${id}`)
      .map(response => response.json());
  }
}
