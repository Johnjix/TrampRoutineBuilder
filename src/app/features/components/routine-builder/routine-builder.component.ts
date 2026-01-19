import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
} from '@angular/core';
import { Skill } from '../../../models/skill.model';
import { RoutineTariffCalculatorPipe } from '../../../shared/pipes/routine-tariff-calculator.pipe';
import { CommonModule } from '@angular/common';
import {
  NgbAccordionDirective,
  NgbAccordionModule,
} from '@ng-bootstrap/ng-bootstrap';
import { RoutineTemplate } from '../../../models/routine-template.model';
import { ROUTINE_TEMPLATES } from '../../../shared/data/routine-templates';
import { InputSkillSelectorComponent } from '../../../shared/components/input-skill-selector/input-skill-selector.component';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-routine-builder',
  imports: [
    RoutineTariffCalculatorPipe,
    CommonModule,
    NgbAccordionModule,
    InputSkillSelectorComponent,
    FormField,
  ],
  templateUrl: './routine-builder.component.html',
  styleUrl: './routine-builder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutineBuilderComponent {
  protected readonly accordion = viewChild<NgbAccordionDirective>('acc');
  protected readonly routineModel = signal<{ skills: (Skill | null)[] }>({
    skills: Array(10).fill(null),
  });
  protected readonly routineFormTree = form(this.routineModel);

  protected readonly showTemplateRoutineSelection = signal(true);

  protected readonly premadeRoutines =
    signal<RoutineTemplate[]>(ROUTINE_TEMPLATES);

  selectRoutineTemplate(
    routineTemplate: RoutineTemplate,
    accordion?: NgbAccordionDirective,
  ): void {
    this.routineModel.set({
      skills: routineTemplate.routine,
    });

    accordion?.collapseAll();
  }
}
