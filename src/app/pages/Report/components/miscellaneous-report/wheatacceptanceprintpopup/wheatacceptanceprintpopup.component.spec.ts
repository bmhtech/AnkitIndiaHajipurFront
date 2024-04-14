import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheatacceptanceprintpopupComponent } from './wheatacceptanceprintpopup.component';

describe('WheatacceptanceprintpopupComponent', () => {
  let component: WheatacceptanceprintpopupComponent;
  let fixture: ComponentFixture<WheatacceptanceprintpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheatacceptanceprintpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheatacceptanceprintpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
