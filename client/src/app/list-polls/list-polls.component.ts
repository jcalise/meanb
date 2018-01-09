import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { SurveyService } from './../survey.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Survey } from './../survey';


@Component({
  selector: 'app-list-polls',
  templateUrl: './list-polls.component.html',
  styleUrls: ['./list-polls.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListPollsComponent implements OnInit {
  surveys: Survey[] = [];
  errorMessage = '';
  searchTerm = '';
  user = '';


  constructor(private _surveyService: SurveyService,
    private router: Router,
    private route: ActivatedRoute,
    private _auth: AuthService) { }

  ngOnInit() {
    this._surveyService.surveyObserver.subscribe(
      surveys => this.surveys = surveys
    );
    this._surveyService.retrieveAll();

    this.user = this._auth.getUser();
  }

  delete(survey) {
      this._surveyService.delete(survey)
      .subscribe(
        errorResponse => {
          this.errorMessage = errorResponse;
        }
      );
      this.router.navigate(['/list']);
    }

  search() {
    this.router.navigate([`/search/${this.searchTerm}`]);
    this.searchTerm = '';
  }

  logout() {
    this._auth.logout();
  }
}
