import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubmasterComponent } from './hubmaster.component';

describe('HubmasterComponent', () => {
  let component: HubmasterComponent;
  let fixture: ComponentFixture<HubmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
