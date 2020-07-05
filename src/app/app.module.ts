import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { ChartModule } from 'angular-highcharts';

import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { ChartcontainerComponent } from './chartcontainer/chartcontainer.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    ChartcontainerComponent
  ],
  imports: [
    BrowserModule,
    // ChartModule // add ChartModule to your imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
