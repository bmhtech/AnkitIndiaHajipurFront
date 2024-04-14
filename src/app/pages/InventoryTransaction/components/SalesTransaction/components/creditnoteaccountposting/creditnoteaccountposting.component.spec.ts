import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditnoteaccountpostingComponent } from './creditnoteaccountposting.component';

describe('CreditnoteaccountpostingComponent', () => {
  let component: CreditnoteaccountpostingComponent;
  let fixture: ComponentFixture<CreditnoteaccountpostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditnoteaccountpostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditnoteaccountpostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
