import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.css']
})
export class NearbyComponent implements OnInit {

  lat:number ;
  long:number ;

  constructor() { }

  ngOnInit(): void {
  }


 getLocation() {
    let x = document.getElementById('status');
    if (navigator.geolocation) {
      console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition(this.showPosition);
      this.showLocationDetails(this.showPosition);
    } else {
      x.innerText = "Geolocation is not supported by this browser.";
    }
  }

  showPosition(position) {
    return {
      log: function(){
        return "Latitude: " + position.coords.latitude +
          " Longitude: " + position.coords.longitude
          return position.coords.latitude;
      },
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      status: (function(){
        document.getElementById('status').innerHTML = this.log();
      })
    }
  }

  showLocationDetails(showPosition){
    let y = showPosition.latitude
    // this.long = showPosition.coords.longitude;
    // let result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.lat},${this.long}&key=AIzaSyCXCf6R2WczXfIRF_zBtTaB6Mw6oSyV8W4`)
    // if(result.ok){
    //   let data = result.json();
    //   console.log(data)
    // }

    console.log(y)
  }

}
