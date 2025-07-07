import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLoadingIconComponent } from './page-loading-icon.component';

describe('PageLoadingIconComponent', () => {
  let component: PageLoadingIconComponent;
  let fixture: ComponentFixture<PageLoadingIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLoadingIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageLoadingIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
