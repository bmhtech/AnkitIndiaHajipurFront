import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinMasterComponent } from './bin-master.component';

describe('BinMasterComponent', () => {
  let component: BinMasterComponent;
  let fixture: ComponentFixture<BinMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
