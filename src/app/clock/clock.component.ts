import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, TimeInterval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, OnDestroy {

  d;
  newDate;
  hours;
  minutes;
  seconds;
  subscription: Subscription;
  everySec: Observable<number> = interval(1000);
  pm;


  constructor() { }

  ngOnInit() {
    this.subscription = this.everySec.subscribe(val => {
      this.d = new Date();
      this.hours = this.formatHours(this.d.getHours());
      this.minutes = this.addZero(this.d.getMinutes());
      this.seconds = this.addZero(this.d.getSeconds());
      this.pm = this.isPm(this.d.getHours());
      this.newDate = this.formatDate(this.d);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addZero(val: number) {
    return val < 10 ? '0' + val : val;
  }

  formatHours(val: number) {
    if (val > 12){
      return val - 12;
    } else if (val === 0){
      return 12;
    } else{
      return val;
    }
  }

  isPm(val: number): string {
    return val <= 12 ? 'AM' : 'PM';
  }

  formatDate(val) {
    const form = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateTimeFormat3 = new Intl.DateTimeFormat('en-US', form).format(val);
    return dateTimeFormat3;
  }


}
