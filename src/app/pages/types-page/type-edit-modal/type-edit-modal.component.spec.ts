import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEditModalComponent } from './type-edit-modal.component';

describe('TypeEditModalComponent', () => {
  let component: TypeEditModalComponent;
  let fixture: ComponentFixture<TypeEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
