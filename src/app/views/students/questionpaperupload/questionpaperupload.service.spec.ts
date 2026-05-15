import { TestBed } from '@angular/core/testing';

import { QuestionpaperuploadService } from './questionpaperupload.service';

describe('QuestionpaperuploadService', () => {
  let service: QuestionpaperuploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionpaperuploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
