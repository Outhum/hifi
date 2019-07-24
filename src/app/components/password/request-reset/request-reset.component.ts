import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnotifyService } from 'ng-snotify';
import { TranslateService } from '@ngx-translate/core';




@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  constructor(public http: HttpClient,private notify:SnotifyService,public translate: TranslateService) {
    translate.addLangs(['en', 'hi']); //ctrl+k+c to comment k+u to uncomment
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
     var val = ('#langselect');
    localStorage.setItem('lang',val);
    translate.use(localStorage.getItem('lang')?localStorage.getItem('lang'):browserLang);//browserLang.match(/en|hi/) ? browserLang : 'en') { 

  }
  public form = {
    email: null,
  };

  public error = null; 

  ngOnInit() {
  }

  onSubmit() {
    this.http.post('http://127.0.0.1:8000/api/requestresetpassword', this.form).subscribe(
      data => this.handleResponse(data),
      error =>this.notify.error(error.error.error)
      
    );

  }
  handleError(error) {
    this.error = error.error.error;
  }

  handleResponse(data) {
    console.log(data);
   this.form.email =null;

  }

}
