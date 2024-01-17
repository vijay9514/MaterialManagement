import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplerMasterFormComponent } from './suppler-master-form.component';

describe('SupplerMasterFormComponent', () => {
  let component: SupplerMasterFormComponent;
  let fixture: ComponentFixture<SupplerMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplerMasterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplerMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
