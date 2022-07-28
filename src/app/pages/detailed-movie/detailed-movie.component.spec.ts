import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedMovieComponent } from './detailed-movie.component';

describe('DetailedMovieComponent', () => {
  let component: DetailedMovieComponent;
  let fixture: ComponentFixture<DetailedMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
