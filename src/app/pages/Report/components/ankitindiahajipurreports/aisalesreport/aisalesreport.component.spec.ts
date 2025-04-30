import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AisalesreportComponent } from './aisalesreport.component';

describe('AisalesreportComponent', () => {
  let component: AisalesreportComponent;
  let fixture: ComponentFixture<AisalesreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AisalesreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AisalesreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
