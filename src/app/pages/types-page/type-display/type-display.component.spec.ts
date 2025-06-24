import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDisplayComponent } from './type-display.component';

describe('TypeDisplayComponent', () => {
  let component: TypeDisplayComponent;
  let fixture: ComponentFixture<TypeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
