import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { StateService } from '../state.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})


export class DropdownComponent implements OnInit {
  myControl = new FormControl();
  options = ['One', 'Two', 'Three'];
  selections = [];
  filteredOptions: Observable<string[]>;

  constructor(private stateService: StateService ) { }

  ngOnInit(){
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

      
    this.getOptions();
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getOptions(){
    return this.stateService.getStates().subscribe((data) => {
      this.selections.push(data);
      console.log(this.selections);
    })
  }


}

  


