import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateArnNoComponent } from './update-arn-no.component';

describe('UpdateArnNoComponent', () => {
  let component: UpdateArnNoComponent;
  let fixture: ComponentFixture<UpdateArnNoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateArnNoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateArnNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
