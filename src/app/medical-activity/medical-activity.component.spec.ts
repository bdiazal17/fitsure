import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalActivityComponent } from './medical-activity.component';

describe('MedicalActivityComponent', () => {
  let component: MedicalActivityComponent;
  let fixture: ComponentFixture<MedicalActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
