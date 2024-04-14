import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadBillPrintComponent } from './unload-bill-print.component';

describe('UnloadBillPrintComponent', () => {
  let component: UnloadBillPrintComponent;
  let fixture: ComponentFixture<UnloadBillPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnloadBillPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnloadBillPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
