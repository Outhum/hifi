import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SnotifyService } from 'ng-snotify';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
  public form ={
    email:null,
    password:null,
    confirmpassword:null,
    resetToken : null
    };
  
    public error=[];
    //public error1 = null;
   public e=null;
  

  constructor(public http:HttpClient,private notify:SnotifyService,private router:Router,private route:ActivatedRoute) 
  {
    route.queryParams.subscribe(params => {
      this.form.resetToken =params['token']
    });
   }

  
  ngOnInit() {
  }
  onSubmit(){ 
    this.http.post('http://127.0.0.1:8000/api/responseresetpassword',this.form).subscribe(
     data =>this.handleResponse(data),
     
     error =>this.handleError(error),
     
    );
   // alert(this.error);
    //this.first(this.error1)
  }
  handleResponse(data){
    this.form =null;
    this.router.navigateByUrl('/login');
  }
  handleError(error){
   this.error = error.error.errors;
   if(!error.error.errors)
   alert(error.error.error);
  }
  
  
  

}
