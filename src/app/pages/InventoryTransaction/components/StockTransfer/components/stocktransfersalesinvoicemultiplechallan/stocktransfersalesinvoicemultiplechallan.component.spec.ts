import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocktransfersalesinvoicemultiplechallanComponent } from './stocktransfersalesinvoicemultiplechallan.component';

describe('StocktransfersalesinvoicemultiplechallanComponent', () => {
  let component: StocktransfersalesinvoicemultiplechallanComponent;
  let fixture: ComponentFixture<StocktransfersalesinvoicemultiplechallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocktransfersalesinvoicemultiplechallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocktransfersalesinvoicemultiplechallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
