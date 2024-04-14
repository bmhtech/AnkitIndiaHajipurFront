import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewVechilePopUpComponentGrComponent } from './add-new-vechile-pop-up-component-gr.component';

describe('AddNewVechilePopUpComponentGrComponent', () => {
  let component: AddNewVechilePopUpComponentGrComponent;
  let fixture: ComponentFixture<AddNewVechilePopUpComponentGrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewVechilePopUpComponentGrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewVechilePopUpComponentGrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
