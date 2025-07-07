import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationDisplayComponent } from './pagination-display.component';

describe('PaginationDisplayComponent', () => {
  let component: PaginationDisplayComponent;
  let fixture: ComponentFixture<PaginationDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
