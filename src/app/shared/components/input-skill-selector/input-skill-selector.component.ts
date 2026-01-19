import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
} from '@angular/core';
import { SkillSelectionModalComponent } from '../../../features/components/skill-selection-modal/skill-selection-modal.component';
import { Skill } from '../../../models/skill.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  DisabledReason,
  FormValueControl,
  ValidationError,
  WithOptionalField,
} from '@angular/forms/signals';
import { LandingPosition } from '../../../models/landing-position.model';

@Component({
  selector: 'app-input-skill-selector',
  imports: [],
  templateUrl: './input-skill-selector.component.html',
  styleUrl: './input-skill-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSkillSelectorComponent implements FormValueControl<Skill | null> {
  private readonly _modalService = inject(NgbModal);

  // Signal forms implementation
  readonly value = model<Skill | null>(null);
  readonly touched = model(false);
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly hidden = input(false);

  readonly previousSkillLandingPosition = input<LandingPosition>('feet');
  readonly placeholder = input('Select skill');
  readonly skillIndex = input.required<number>();
  readonly invalid = input(false);
  readonly errors = input<readonly ValidationError.WithOptionalField[]>([]);
  readonly disabledReasons = input<
    readonly WithOptionalField<DisabledReason>[]
  >([]);

  openSkillSelectionModal(
    skillIndex: number,
    skill: Skill | null,
    previousSkillLandingPosition: LandingPosition,
  ): void {
    const _modalRef = this._modalService.open(SkillSelectionModalComponent, {
      fullscreen: true,
      scrollable: true,
    });

    const componentInstance: SkillSelectionModalComponent =
      _modalRef.componentInstance;

    componentInstance.requiredTakeoffPosition = previousSkillLandingPosition;
    if (skill) componentInstance.selectedSkill = skill;
    componentInstance.skillIndex = skillIndex;

    _modalRef.result
      .then((selectedSkill: Skill) => {
        this.value.set(selectedSkill);
      })
      .catch(() => null);
  }
}
