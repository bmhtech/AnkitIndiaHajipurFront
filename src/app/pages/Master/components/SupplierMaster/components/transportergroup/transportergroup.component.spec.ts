import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportergroupComponent } from './transportergroup.component';

describe('TransportergroupComponent', () => {
  let component: TransportergroupComponent;
  let fixture: ComponentFixture<TransportergroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportergroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
