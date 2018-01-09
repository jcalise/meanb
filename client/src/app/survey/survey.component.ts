import { SurveyService } from './../survey.service';
import { Component, OnInit, Input } from '@angular/core';
import { Survey } from './../survey';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  // survey = {name: 'Joe', question: 'What breed of dog is the best?', date: 'January 7, 2017',
  // options: [
  //     {option: 'Golden Retriever', result: 28},
  //     {option: 'Poodle', result: 22},
  //     {option: 'Chow Chow', result: 38},
  //     {option: 'Husky', result: 28}]
  // };

  @Input() survey: Survey;
  errorMessage = '';

  constructor(private _surveyService: SurveyService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.switchMap(params =>
      this._surveyService.getOne(params.get('id'))
    )
    .subscribe(
      survey => this.survey = survey,
      errorResponse => {
        this.errorMessage = errorResponse.json();
      }
    );
  }

  vote(option, id) {
    this.route.paramMap.switchMap(params =>
      this._surveyService.vote(params.get('id'), option)
    )
    .subscribe(
      survey => this.survey = survey,
      errorResponse => {
        this.errorMessage = errorResponse.json();
      }
    );
  }

}
