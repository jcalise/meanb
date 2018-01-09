import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username = '';
  errorMessage = '';

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }
  onSubmit() {
    this.auth.login(this.username)
    .subscribe(
      errorResponse => {
        this.errorMessage = errorResponse;
      }
    );
    this.router.navigate(['/list']);
  }
}
