import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { TranslateService } from '@ngx-translate/core';
import { browser } from 'protractor';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private token: TokenService, public translate: TranslateService) {
     translate.addLangs(['en', 'hi']); //ctrl+k+c to comment k+u to uncomment
     translate.setDefaultLang('en');
     const browserLang = translate.getBrowserLang();
      var val = ('#langselect');
     localStorage.setItem('lang',val);
     translate.use(localStorage.getItem('lang')?localStorage.getItem('lang'):browserLang);//browserLang.match(/en|hi/) ? browserLang : 'en'
  }

  public loggedIn: boolean;
  lastAction = Date.now();


  ngOnInit() {
    // this.auth.authStatus.subscribe(value=>this.loggedIn=value);
    this.auth.authStatus.subscribe(value => this.loggedIn = value);
  }
  logout(e: MouseEvent) {
    e.preventDefault();
    this.token.remove();
    this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

  check() {
    const MINUTES_UNITL_AUTO_LOGOUT = 5 ;// in Minutes
    const CHECK_INTERVALL = 1000; // in ms
    const now = Date.now();
    const timeleft = this.lastAction + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    if (isTimeout && this.loggedIn) {
      this.token.remove();
      this.auth.changeAuthStatus(false);
      this.router.navigateByUrl('/login');
    }
  }


}
