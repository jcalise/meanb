import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { SurveyService } from './../survey.service';
import { Survey } from './../survey';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  survey: Survey = new Survey();
  options = [];
  option1 = '';
  option2 = '';
  option3 = '';
  option4 = '';

  constructor(private _surveyService: SurveyService, private router: Router, private _auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit(survey: Survey) {
    event.preventDefault();

    this.options.push({option: this.option1, result: 0});
    this.options.push({option: this.option2, result: 0});
    this.options.push({option: this.option3, result: 0});
    this.options.push({option: this.option4, result: 0});
    this.survey.options = this.options;
    this.survey.name = this._auth.getUser();

    this._surveyService.createSurvey(this.survey);
    this.survey = new Survey();
    this.option1 = '';
    this.option2 = '';
    this.option3 = '';
    this.option4 = '';
    this.options = [];

    this.router.navigate(['/list']);
  }

}
