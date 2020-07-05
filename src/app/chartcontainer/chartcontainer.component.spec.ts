import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartcontainerComponent } from './chartcontainer.component';

describe('ChartcontainerComponent', () => {
  let component: ChartcontainerComponent;
  let fixture: ComponentFixture<ChartcontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartcontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
