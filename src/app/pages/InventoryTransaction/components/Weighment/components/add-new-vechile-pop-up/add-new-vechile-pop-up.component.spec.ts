import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewVechilePopUpComponent } from './add-new-vechile-pop-up.component';

describe('AddNewVechilePopUpComponent', () => {
  let component: AddNewVechilePopUpComponent;
  let fixture: ComponentFixture<AddNewVechilePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewVechilePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewVechilePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
