import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductMasterComponent } from './addproduct-master.component';

describe('AddproductMasterComponent', () => {
  let component: AddproductMasterComponent;
  let fixture: ComponentFixture<AddproductMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddproductMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddproductMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
