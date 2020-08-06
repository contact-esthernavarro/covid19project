import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StateService } from '../state.service';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})

export class DropdownComponent implements OnInit {
  
  myControl = new FormControl();
  selections;
  selected = {name: 'California', abbreviation: 'CA'};


  constructor(private stateService: StateService ) { }

  ngOnInit(){
    this.getOptions();
  }

  getOptions(){
    return this.stateService.getStates().subscribe((data) => {
      this.selections = data;
    })
  }

}

  


