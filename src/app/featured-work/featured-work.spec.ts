import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedWork } from './featured-work';

describe('FeaturedWork', () => {
  let component: FeaturedWork;
  let fixture: ComponentFixture<FeaturedWork>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedWork]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedWork);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
