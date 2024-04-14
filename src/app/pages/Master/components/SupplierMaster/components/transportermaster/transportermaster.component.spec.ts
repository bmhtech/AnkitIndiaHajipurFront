import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportermasterComponent } from './transportermaster.component';

describe('TransportermasterComponent', () => {
  let component: TransportermasterComponent;
  let fixture: ComponentFixture<TransportermasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportermasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
