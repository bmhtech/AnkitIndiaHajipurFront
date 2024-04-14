import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesMasterComponent } from './charges-master.component';

describe('ChargesMasterComponent', () => {
  let component: ChargesMasterComponent;
  let fixture: ComponentFixture<ChargesMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargesMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
