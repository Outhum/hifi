import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {trigger,state,style} from '@angular/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations:[
    trigger('divcloseopen',[
    state('close',style({width:'0px'})),
    state('open',style({width:'100px'})),
  ]),
  trigger('divopen',[
    state('close',style({width:'0px'})),
    state('open',style({width:'100px'})),
  ])
]
})
export class ProfileComponent implements OnInit {

  openclose:string = 'open';
  constructor(  ) { }

  ngOnInit() {
  }

  hideAndshow():void{
  this.openclose = (this.openclose ==='close')?'close' : 'open';
  }

}
