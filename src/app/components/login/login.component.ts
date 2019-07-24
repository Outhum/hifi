import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { TokenService } from '../../Services/token.service';
import { AuthService } from 'src/app/Services/auth.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = { 
    email: null,
    password: null
  };

  public error = null;

  constructor(private http: HttpClient,private router:Router,private token:TokenService,private auth:AuthService,public translate: TranslateService) {
    translate.addLangs(['en', 'hi']); //ctrl+k+c to comment k+u to uncomment
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    //alert(browserLang)
    //translate.use(browserLang.match(/en|hi/) ? 'hi' : browserLang);
    translate.use(localStorage.getItem('lang')?localStorage.getItem('lang'):browserLang);//browserLang.match(/en|hi/) ? browserLang : 'en'

  }

  onSubmit(){
   return this.http.post('http://127.0.0.1:8000/api/login',this.form).subscribe(
      
      data => this.handleResponse(data),
      error => this.handleError(error),

   );
  }
  handleError(error){
    this.error = error.error.error;
  }

  handleResponse(data){
    this.token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
    
  }
  ngOnInit() {
  }

  //CORS system - cross origin resource sharing system
}
