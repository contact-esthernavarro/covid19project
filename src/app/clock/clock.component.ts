import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, TimeInterval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, OnDestroy {

  d;
  hours;
  minutes;
  seconds ;
  subscription: Subscription;
  everySec  : Observable<number> = interval(1000);


  constructor() { }

  ngOnInit() {
    this.subscription = this.everySec.subscribe(val => {
      this.d = new Date();
      this.hours = this.d.getHours();
      this.minutes = this.addZero(this.d.getMinutes());
      this.seconds = this.addZero(this.d.getSeconds());
    });
   

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  addZero(val){
    if(val < 10){
      return "0" + val;
    }
    return val;
  }

  

  




}
