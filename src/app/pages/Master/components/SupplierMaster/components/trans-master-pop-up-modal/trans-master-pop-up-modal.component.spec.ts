import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransMasterPopUpModalComponent } from './trans-master-pop-up-modal.component';

describe('TransMasterPopUpModalComponent', () => {
  let component: TransMasterPopUpModalComponent;
  let fixture: ComponentFixture<TransMasterPopUpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransMasterPopUpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransMasterPopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
