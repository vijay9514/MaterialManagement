import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardListComponent } from './outward-list.component';

describe('OutwardListComponent', () => {
  let component: OutwardListComponent;
  let fixture: ComponentFixture<OutwardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutwardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutwardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
