import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheatreceivingreportprintpopupComponent } from './wheatreceivingreportprintpopup.component';

describe('WheatreceivingreportprintpopupComponent', () => {
  let component: WheatreceivingreportprintpopupComponent;
  let fixture: ComponentFixture<WheatreceivingreportprintpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheatreceivingreportprintpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheatreceivingreportprintpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
