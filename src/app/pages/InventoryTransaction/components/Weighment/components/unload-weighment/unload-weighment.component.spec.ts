import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadWeighmentComponent } from './unload-weighment.component';

describe('UnloadWeighmentComponent', () => {
  let component: UnloadWeighmentComponent;
  let fixture: ComponentFixture<UnloadWeighmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnloadWeighmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnloadWeighmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
