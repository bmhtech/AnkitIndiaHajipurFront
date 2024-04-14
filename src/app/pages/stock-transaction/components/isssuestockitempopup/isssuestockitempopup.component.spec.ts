import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsssuestockitempopupComponent } from './isssuestockitempopup.component';

describe('IsssuestockitempopupComponent', () => {
  let component: IsssuestockitempopupComponent;
  let fixture: ComponentFixture<IsssuestockitempopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsssuestockitempopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsssuestockitempopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
