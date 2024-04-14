import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorMasterComponent } from './visitor-master.component';

describe('VisitorMasterComponent', () => {
  let component: VisitorMasterComponent;
  let fixture: ComponentFixture<VisitorMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
