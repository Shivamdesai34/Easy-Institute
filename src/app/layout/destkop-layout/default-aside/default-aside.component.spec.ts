import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultAsideComponent } from './default-aside.component';

import { SidebarModule } from '@coreui/angular-pro';

describe('DefaultAsideComponent', () => {
  let component: DefaultAsideComponent;
  let fixture: ComponentFixture<DefaultAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarModule, DefaultAsideComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
