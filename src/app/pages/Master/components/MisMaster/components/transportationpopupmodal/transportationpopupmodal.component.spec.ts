import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationpopupmodalComponent } from './transportationpopupmodal.component';

describe('TransportationpopupmodalComponent', () => {
  let component: TransportationpopupmodalComponent;
  let fixture: ComponentFixture<TransportationpopupmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportationpopupmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportationpopupmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
