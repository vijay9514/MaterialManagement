import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialMenusComponent } from './material-menus.component';

describe('MaterialMenusComponent', () => {
  let component: MaterialMenusComponent;
  let fixture: ComponentFixture<MaterialMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialMenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
