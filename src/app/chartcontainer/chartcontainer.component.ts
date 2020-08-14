import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-chartcontainer',
  templateUrl: './chartcontainer.component.html',
  styleUrls: ['./chartcontainer.component.css']
})
export class ChartcontainerComponent implements OnInit {

  dateSet = [];
  statesSet = [];
  selectedState = 'ca';
  state = { name: 'California', abbreviation: 'ca'};
  dateLastModified;

  // chart config for current stats
  public options: any = {
    chart: {
      type: 'column',
      events: { load: this.currentFunc() }
    },
    title: { text: 'Cumulative Covid-19 Report' },
    subtitle: { text: 'The most recent COVID data for the US' },
    xAxis: {
      labels: { enabled: true },
      categories: ['positive', 'death', 'hospitalized', 'recovered']
    },
    yAxis: {
      title: 'Number of Cases',
    },
    series: [
      {
        name: 'Current',
        data: [],
        color: 'orange'
      }
    ],
    legend: { enabled: true },
  };

  // chart config for daily stats
  public options2: any = {
    chart: {
      type: 'line',
      events: { load: this.dailyFunc() }
    },
    title: { text: 'Daily Occurence Recorded' },
    subtitle: { text: 'All COVID data for the US' },
    xAxis: {
      title: { text: 'Date' },
      labels: { enabled: true },
      reversed: { enabled: true },
      categories: this.dateSet
    },
    yAxis: {
      title: { text: 'Number of Cases' }
    },
    series: [
      {
        name: 'Number of Positive Cases',
        data: [],
        color: 'orange'
      },
      {
        name: 'Number of Deaths',
        data: [],
        color: 'black'
      }
    ],
    legend: { enabled: true },
  };

  // chart config for current stats for 56 states
  public options3: any = {
    chart: {
      type: 'column',
      events: { load: this.statesFunc() }
    },
    title: { text: 'Current values for All States - Covid-19 Report' },
    subtitle: { text: 'The most recent COVID data for every state' },
    xAxis: {
      title: { text: 'State' },
      labels: { enabled: true },
      categories: this.statesSet
    },
    yAxis: {
      title: 'Number of Cases',
      labels: { enabled: true },
    },
    series: [
      {
        name: 'Number of Positive Cases Per Day',
        data: [],
        color: 'orange'
      }
    ],
    legend: { enabled: true }
  };

  // chart config for individual state
  public options4: any = {
    chart: {
      type: 'line',
      events: { load: this.indivStateFunc() }
    },
    title: {text: `Historic values for state of ${this.state.name}` },
    subtitle: { text: 'The most recent COVID data per state' },
    xAxis: {
      title: { text: 'Date' },
      labels: { enabled: true },
      reversed: { enabled: true },
      categories: this.dateSet
    },
    yAxis: {
      title: 'Number of Cases',
      labels: { enabled: true },
    },
    series: [
      {
        name: 'Number of Positive Cases',
        data: [],
        color: 'orange'
      },
      {
        name: 'Number of Deaths',
        data: [],
        color: 'black'
      }
    ],
    legend: { enabled: true },
  };

  constructor() { }

  ngOnInit() {
    Highcharts.chart('container', this.options);
    Highcharts.chart('lineContainer', this.options2);
    Highcharts.chart('statesContainer', this.options3);
    Highcharts.chart('indivStateContainer', this.options4);
    this.dateUpdated();
  }

  // functions for highcharts events
  currentFunc() {
    this.pullDataByCurrent();
    setInterval(this.pullDataByCurrent, 3600000);
  }

  dailyFunc() {
    this.pullDataByDaily();
    setInterval(this.pullDataByDaily, 3600000);
  }

  statesFunc() {
    this.pullDataByStates();
    setInterval(this.pullDataByStates, 3600000);
  }

  indivStateFunc(){
    this.pullDataByIndivState();
    setInterval(this.pullDataByIndivState, 3600000);
  }


  // Data fetch and Data series
  //TODO!!! refactor code: API call into service to avoid mutating state
  async pullDataByIndivState() {
    const result = await fetch(`https://covidtracking.com/api/v1/states/${this.selectedState}/daily.json`);
    if (result.ok) {
      let positiveDataSet = [];
      let deathDataSet = [];
      let data = await result.json();
      const chart = Highcharts.chart('indivStateContainer', this.options4);
      const series_0 = chart.series[0];
      const series_1 = chart.series[1];

      data.map((val) => {
        positiveDataSet.push([this.formatDate(val.date), val.positiveIncrease]);
        deathDataSet.push([this.formatDate(val.date), val.deathIncrease]);
        this.dateSet.push(this.formatDate(val.date))
      })

      series_0.setData(positiveDataSet, true, true, true);
      series_1.setData(deathDataSet, true, true, true);
    }
  }
  
  //TODO!!! refactor code: API call into service to avoid mutating state
  async pullDataByStates() {
    const result = await fetch('https://covidtracking.com/api/v1/states/current.json');
    if (result.ok) {
      let data = await result.json();
      let positiveDataSet = [];
      let deathDataSet = [];
      const chart = Highcharts.chart('statesContainer', this.options3);
      const series_A = chart.series[0];
      const series_B = chart.series[1];

      data.map((val) => {
        positiveDataSet.push([val.state, val.positiveIncrease]);
        deathDataSet.push([val.state, val.deathIncrease]);
        this.statesSet.push(val.state);
      })

      series_A.setData(positiveDataSet, true, true, true);
    }
  }

  //TODO!!! refactor code: API call into service to avoid mutating state
  async pullDataByCurrent() {
    const result = await fetch('https://covidtracking.com/api/v1/us/current.json');
    if (result.ok) {
      let data = await result.json();
      const chart = Highcharts.chart('container', this.options);
      const dataSet = [data[0].positive, data[0].death, data[0].hospitalized, data[0].recovered];
      const series_0 = chart.series[0];
      const shift = series_0.data.length > 20;

      dataSet.map((val) => {
        series_0.addPoint(val, true, shift)
      })
    }
  }

  //TODO!!! refactor code: API call into service to avoid mutating state
  async pullDataByDaily() {
    const result = await fetch('https://covidtracking.com/api/v1/us/daily.json');
    if (result.ok) {
      let positiveDataSet = [];
      let deathDataSet = [];
      let data = await result.json();
      const chart = Highcharts.chart('lineContainer', this.options2);
      const series_0 = chart.series[0];
      const series_1 = chart.series[1];

      data.map((val) => {
        positiveDataSet.push([this.formatDate(val.date), val.positiveIncrease]);
        deathDataSet.push([this.formatDate(val.date), val.deathIncrease]);
        this.dateSet.push(this.formatDate(val.date))
      })

      series_0.setData(positiveDataSet, true, true, true);
      series_1.setData(deathDataSet, true, true, true);
    }
  }

  //TODO!!! refactor code: API call into service to avoid mutating state
  async dateUpdated() {
    const result = await fetch('https://covidtracking.com/api/v1/us/current.json');
    if (result.ok) {
      const data = await result.json();
      this.dateLastModified = this.formatDate(data[0].date);
    }
  }


  // date formatter function
  formatDate(val) {
    const str = val.toString();
    const month = str.substring(4, 6);
    const day = str.substring(6, 8);
    const year = str.substring(0, 4);
    return `${month}-${day}-${year}`;
  }

  //updates individual state title once selected 'state' value changed
  onValueChange(event){
    this.state = event;
    this.selectedState = event.abbreviation.toLowerCase();
    this.indivStateFunc();
    this.options4.title = { text: `Historic values for state of ${this.state.name}`};
  }


}


