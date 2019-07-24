import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../Services/token.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient, private token: TokenService, private router: Router,public translate: TranslateService) {
    translate.addLangs(['en', 'hi']); //ctrl+k+c to comment k+u to uncomment
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
   // alert(get('lang'));
   // translate.use(browserLang.match(/en|hi/) ? 'hi':browserLang);
   translate.use(localStorage.getItem('lang')?localStorage.getItem('lang'):browserLang);//browserLang.match(/en|hi/) ? browserLang : 'en'

   }
  public error = [];

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };
  onSubmit() {
    return this.http.post('http://127.0.0.1:8000/api/signup', this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error),
    );
  }
  handleError(error) {
    this.error = error.error.errors;
  }
  handleResponse(data) {
    this.token.handle(data.access_token);
    this.router.navigateByUrl('/profile');

  }
  ngOnInit() {
  }

}
