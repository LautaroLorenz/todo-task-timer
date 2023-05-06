import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowWithActionsComponent } from './row-with-actions.component';

describe('RowWithActionsComponent', () => {
  let component: RowWithActionsComponent;
  let fixture: ComponentFixture<RowWithActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowWithActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowWithActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
