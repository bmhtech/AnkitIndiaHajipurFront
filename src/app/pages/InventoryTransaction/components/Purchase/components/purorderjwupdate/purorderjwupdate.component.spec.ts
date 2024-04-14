import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurorderjwupdateComponent } from './purorderjwupdate.component';

describe('PurorderjwupdateComponent', () => {
  let component: PurorderjwupdateComponent;
  let fixture: ComponentFixture<PurorderjwupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurorderjwupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurorderjwupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
