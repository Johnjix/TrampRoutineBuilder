import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSelectionModalComponent } from './skill-selection-modal.component';

describe('SkillSelectionModalComponent', () => {
  let component: SkillSelectionModalComponent;
  let fixture: ComponentFixture<SkillSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillSelectionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
