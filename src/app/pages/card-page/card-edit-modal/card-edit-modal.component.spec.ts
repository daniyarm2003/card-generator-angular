import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEditModalComponent } from './card-edit-modal.component';

describe('CardEditModalComponent', () => {
  let component: CardEditModalComponent;
  let fixture: ComponentFixture<CardEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
