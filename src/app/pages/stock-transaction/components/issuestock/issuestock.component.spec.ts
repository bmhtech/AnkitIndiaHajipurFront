import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuestockComponent } from './issuestock.component';

describe('IssuestockComponent', () => {
  let component: IssuestockComponent;
  let fixture: ComponentFixture<IssuestockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuestockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
