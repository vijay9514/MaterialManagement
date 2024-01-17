import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMasterListComponent } from './staff-master-list.component';

describe('StaffMasterListComponent', () => {
  let component: StaffMasterListComponent;
  let fixture: ComponentFixture<StaffMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
