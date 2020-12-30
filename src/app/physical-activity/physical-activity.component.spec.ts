import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { physicalActivityComponent } from './physical-activity.component';

describe('physicalActivityComponent', () => {
  let component: physicalActivityComponent;
  let fixture: ComponentFixture<physicalActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ physicalActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(physicalActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
