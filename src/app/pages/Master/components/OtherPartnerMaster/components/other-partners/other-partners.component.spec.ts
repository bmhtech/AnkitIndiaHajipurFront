import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPartnersComponent } from './other-partners.component';

describe('OtherPartnersComponent', () => {
  let component: OtherPartnersComponent;
  let fixture: ComponentFixture<OtherPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
