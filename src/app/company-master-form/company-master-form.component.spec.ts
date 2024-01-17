import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMasterFormComponent } from './company-master-form.component';

describe('CompanyMasterFormComponent', () => {
  let component: CompanyMasterFormComponent;
  let fixture: ComponentFixture<CompanyMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyMasterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
