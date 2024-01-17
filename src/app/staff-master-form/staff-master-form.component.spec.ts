import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMasterFormComponent } from './staff-master-form.component';

describe('StaffMasterFormComponent', () => {
  let component: StaffMasterFormComponent;
  let fixture: ComponentFixture<StaffMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffMasterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
