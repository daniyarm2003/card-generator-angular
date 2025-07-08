import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEditPreviewComponent } from './type-edit-preview.component';

describe('TypeEditPreviewComponent', () => {
  let component: TypeEditPreviewComponent;
  let fixture: ComponentFixture<TypeEditPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeEditPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeEditPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
