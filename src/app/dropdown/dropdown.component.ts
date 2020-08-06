import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StateService } from '../state.service';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})

export class DropdownComponent implements OnInit {  
  @Input() state: string;
  @Output() selectionChange: EventEmitter<MatSelectChange>;
  @Output() option = new EventEmitter();
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
    });
  }

  onChange(event){
    this.option.emit(event.value);
  }

}
  


