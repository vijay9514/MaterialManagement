import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutwardMaterialComponent } from './add-outward-material.component';

describe('AddOutwardMaterialComponent', () => {
  let component: AddOutwardMaterialComponent;
  let fixture: ComponentFixture<AddOutwardMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOutwardMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOutwardMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
