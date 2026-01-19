import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputSkillSelectorComponent } from './input-skill-selector.component';

describe('InputSkillSelectorComponent', () => {
  let component: InputSkillSelectorComponent;
  let fixture: ComponentFixture<InputSkillSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSkillSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputSkillSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
