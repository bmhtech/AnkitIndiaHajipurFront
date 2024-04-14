import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagAdviceWithPoComponent } from './tag-advice-with-po.component';

describe('TagAdviceWithPoComponent', () => {
  let component: TagAdviceWithPoComponent;
  let fixture: ComponentFixture<TagAdviceWithPoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagAdviceWithPoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagAdviceWithPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
