import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationmasterListComponent } from './locationmaster-list.component';

describe('LocationmasterListComponent', () => {
  let component: LocationmasterListComponent;
  let fixture: ComponentFixture<LocationmasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationmasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationmasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
