import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationmasterFormComponent } from './locationmaster-form.component';

describe('LocationmasterFormComponent', () => {
  let component: LocationmasterFormComponent;
  let fixture: ComponentFixture<LocationmasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationmasterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationmasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
