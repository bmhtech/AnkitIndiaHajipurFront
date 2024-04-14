import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InverterwisesolarpowergenerationComponent } from './inverterwisesolarpowergeneration.component';

describe('InverterwisesolarpowergenerationComponent', () => {
  let component: InverterwisesolarpowergenerationComponent;
  let fixture: ComponentFixture<InverterwisesolarpowergenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InverterwisesolarpowergenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InverterwisesolarpowergenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
