import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastermodalComponent } from './mastermodal.component';

describe('MastermodalComponent', () => {
  let component: MastermodalComponent;
  let fixture: ComponentFixture<MastermodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastermodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
