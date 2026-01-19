import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
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
export class SkillSelectionModalComponent {
  private readonly _activeModal = inject(NgbActiveModal);

  private _requiredTakeoffPosition!: LandingPosition;

  /* eslint-disable @angular-eslint/prefer-signals */
  // ng-bootstrap modal inputs must remain @Input()
  // setter because ngOnChanges doesn't trigger when using ngbBoostrap component instance
  @Input()
  set requiredTakeoffPosition(position: LandingPosition) {
    this._requiredTakeoffPosition = position;

    this.filterPossibleSkillsBasedOnPreviousLandingPosition(position);
  }
  @Input() selectedSkill: Skill | undefined;
  @Input() skillIndex!: number;

  skills = signal<Skill[]>(skills);
  filterName = signal('');
  filterShape = signal<Shape | null>(null);
  filterMaxDifficulty = signal<number | null>(null);

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

  private filterPossibleSkillsBasedOnPreviousLandingPosition(
    position: LandingPosition,
  ): void {
    this.skills.set(skills.filter((s) => s.takeoff === position));
  }
}
