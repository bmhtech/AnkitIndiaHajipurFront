import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermasserviceComponent } from './termasservice.component';

describe('TermasserviceComponent', () => {
  let component: TermasserviceComponent;
  let fixture: ComponentFixture<TermasserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermasserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermasserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
