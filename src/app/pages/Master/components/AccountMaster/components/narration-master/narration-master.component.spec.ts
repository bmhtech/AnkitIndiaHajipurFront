import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NarrationMasterComponent } from './narration-master.component';

describe('NarrationMasterComponent', () => {
  let component: NarrationMasterComponent;
  let fixture: ComponentFixture<NarrationMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NarrationMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarrationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
