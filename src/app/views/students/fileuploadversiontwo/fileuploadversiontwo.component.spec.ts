import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploadversiontwoComponent } from './fileuploadversiontwo.component';

describe('FileuploadversiontwoComponent', () => {
  let component: FileuploadversiontwoComponent;
  let fixture: ComponentFixture<FileuploadversiontwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileuploadversiontwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileuploadversiontwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
