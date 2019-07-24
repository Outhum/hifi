import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hifi-frontend';
  public x = null;
   
  constructor(private router:Router,private token:TokenService,public translate:TranslateService)
  {
    translate.addLangs(['en','hi']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|hi/)?browserLang:'en');
  }

    
  getLocation(){
    if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(this.showposition);
   
    }else{
      alert('Browser Not supported');
    }
   
  }
  showposition(position){
  const lat = position.coords.latitude;
    const long = position.coords.longitude;
  //console.log(`longitude: ${ long } | latitude: ${ lat }`);

  }//const watcher = navigator.geolocation.watchPosition(displayLocationInfo);





  ngOnInit() {
  
  const watcher = navigator.geolocation.watchPosition(this.showposition);
  setTimeout(() => {
    navigator.geolocation.clearWatch(watcher);
  }, 10);
  this.getLocation(); 
  
  }
}
