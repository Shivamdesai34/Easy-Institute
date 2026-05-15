import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationdetailformComponent } from './educationdetailform.component';

describe('ListFormComponent', () => {
  let component: EducationdetailformComponent;
  let fixture: ComponentFixture<EducationdetailformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationdetailformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationdetailformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
