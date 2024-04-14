import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheatreceivingreportComponent } from './wheatreceivingreport.component';

describe('WheatreceivingreportComponent', () => {
  let component: WheatreceivingreportComponent;
  let fixture: ComponentFixture<WheatreceivingreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheatreceivingreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheatreceivingreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
