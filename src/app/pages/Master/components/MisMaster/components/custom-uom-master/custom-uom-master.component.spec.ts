import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomUomMasterComponent } from './custom-uom-master.component';

describe('CustomUomMasterComponent', () => {
  let component: CustomUomMasterComponent;
  let fixture: ComponentFixture<CustomUomMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomUomMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomUomMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
