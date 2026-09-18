import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { Volunteering } from './volunteering';

describe('Volunteering', () => {
  let component: Volunteering;
  let fixture: ComponentFixture<Volunteering>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Volunteering],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Volunteering);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
