import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyerMasterComponent } from './supplyer-master.component';

describe('SupplyerMasterComponent', () => {
  let component: SupplyerMasterComponent;
  let fixture: ComponentFixture<SupplyerMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplyerMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplyerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
