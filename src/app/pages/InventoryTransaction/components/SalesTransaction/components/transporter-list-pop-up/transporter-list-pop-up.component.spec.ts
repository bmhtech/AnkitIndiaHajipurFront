import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterListPopUpComponent } from './transporter-list-pop-up.component';

describe('TransporterListPopUpComponent', () => {
  let component: TransporterListPopUpComponent;
  let fixture: ComponentFixture<TransporterListPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransporterListPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporterListPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
