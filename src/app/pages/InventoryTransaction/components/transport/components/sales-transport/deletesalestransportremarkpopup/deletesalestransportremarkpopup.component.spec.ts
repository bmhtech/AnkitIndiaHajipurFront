import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletesalestransportremarkpopupComponent } from './deletesalestransportremarkpopup.component';

describe('DeletesalestransportremarkpopupComponent', () => {
  let component: DeletesalestransportremarkpopupComponent;
  let fixture: ComponentFixture<DeletesalestransportremarkpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletesalestransportremarkpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletesalestransportremarkpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
