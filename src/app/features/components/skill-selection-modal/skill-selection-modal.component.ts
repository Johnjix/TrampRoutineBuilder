import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Skill } from '../../../models/skill.model';
import { skills } from '../../../shared/data/skill-database';
import { FilterBySkillNamePipe } from '../../../shared/pipes/filter-by-skill-name.pipe';
import { FormsModule } from '@angular/forms';
import { FilterBySkillShapePipe } from '../../../shared/pipes/filter-by-skill-shape.pipe';
import { Shape } from '../../../models/shape.model';
import { FilterByMaxDifficultyPipe } from '../../../shared/pipes/filter-by-max-difficulty.pipe';

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

  /* eslint-disable @angular-eslint/prefer-signals */
  // ng-bootstrap modal inputs must remain @Input()
  @Input() selectedSkill!: Skill;
  @Input() skillIndex!: number;

  skills: Skill[] = skills;
  filterName = '';
  filterShape: Shape | null = null;
  filterMaxDifficulty: number | null = null;

  closeModal(skill: Skill): void {
    this._activeModal.close(skill);
  }

  dismissModal(): void {
    this._activeModal.dismiss();
  }

  clearFilters(): void {
    this.filterName = '';
    this.filterShape = null;
    this.filterMaxDifficulty = null;
  }
}
