import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneMasterComponent } from './zone-master.component';

describe('ZoneMasterComponent', () => {
  let component: ZoneMasterComponent;
  let fixture: ComponentFixture<ZoneMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
