import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Skill } from '../../../models/skill.model';
import { skills } from '../../../shared/data/skill-database';
import { FilterBySkillNamePipe } from '../../../shared/pipes/filter-by-skill-name.pipe';
import { FormsModule } from '@angular/forms';
import { FilterBySkillShapePipe } from '../../../shared/pipes/filter-by-skill-shape.pipe';
import { Shape } from '../../../models/shape.model';
import { FilterByMaxDifficultyPipe } from '../../../shared/pipes/filter-by-max-difficulty.pipe';
import { LandingPosition } from '../../../models/landing-position.model';

@Component({
  selector: 'app-skill-selection-modal',
  imports: [
    FilterBySkillNamePipe,
    FormsModule,
    FilterBySkillShapePipe,
    FilterByMaxDifficultyPipe,
  ],
  templateUrl: './skill-selection-modal.component.html',
  styleUrl: './skill-selection-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillSelectionModalComponent implements OnChanges {
  private readonly _activeModal = inject(NgbActiveModal);

  /* eslint-disable @angular-eslint/prefer-signals */
  // ng-bootstrap modal inputs must remain @Input()
  @Input() requiredTakeoffPosition!: LandingPosition;
  @Input() selectedSkill: Skill | undefined;
  @Input() skillIndex!: number;

  skills = signal<Skill[]>(skills);
  filterName = signal('');
  filterShape = signal<Shape | null>(null);
  filterMaxDifficulty = signal<number | null>(null);

  ngOnChanges({ requiredTakeoffPosition }: SimpleChanges): void {
    if (!requiredTakeoffPosition) return;

    // Filter list of possible skills based on landing position of previous skill
    this.skills.set(
      skills.filter((s) => s.takeoff === requiredTakeoffPosition.currentValue),
    );
  }

  closeModal(skill: Skill): void {
    this._activeModal.close(skill);
  }

  dismissModal(): void {
    this._activeModal.dismiss();
  }

  clearFilters(): void {
    this.filterName.set('');
    this.filterShape.set(null);
    this.filterMaxDifficulty.set(null);
  }
}
