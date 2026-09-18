import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { Recommendations } from './recommendations';

describe('Recommendations', () => {
  let component: Recommendations;
  let fixture: ComponentFixture<Recommendations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recommendations],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recommendations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
