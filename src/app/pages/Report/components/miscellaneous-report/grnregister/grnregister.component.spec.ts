import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnregisterComponent } from './grnregister.component';

describe('GrnregisterComponent', () => {
  let component: GrnregisterComponent;
  let fixture: ComponentFixture<GrnregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrnregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
