import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewformfeesComponent } from './newformfees.component';

describe('NewformfeesComponent', () => {
  let component: NewformfeesComponent;
  let fixture: ComponentFixture<NewformfeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewformfeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewformfeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
