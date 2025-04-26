import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadItcBillPrintComponent } from './unload-itc-bill-print.component';

describe('UnloadItcBillPrintComponent', () => {
  let component: UnloadItcBillPrintComponent;
  let fixture: ComponentFixture<UnloadItcBillPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnloadItcBillPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnloadItcBillPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
