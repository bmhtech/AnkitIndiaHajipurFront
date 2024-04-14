import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalestransportimagepopupComponent } from './salestransportimagepopup.component';

describe('SalestransportimagepopupComponent', () => {
  let component: SalestransportimagepopupComponent;
  let fixture: ComponentFixture<SalestransportimagepopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalestransportimagepopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalestransportimagepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
