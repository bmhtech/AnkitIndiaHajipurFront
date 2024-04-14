import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditnotejobworkComponent } from './creditnotejobwork.component';

describe('CreditnotejobworkComponent', () => {
  let component: CreditnotejobworkComponent;
  let fixture: ComponentFixture<CreditnotejobworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditnotejobworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditnotejobworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
