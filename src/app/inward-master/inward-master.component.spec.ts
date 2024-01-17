import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardMasterComponent } from './inward-master.component';

describe('InwardMasterComponent', () => {
  let component: InwardMasterComponent;
  let fixture: ComponentFixture<InwardMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InwardMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InwardMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
