import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Skill } from '../../../models/skill.model';
import { RoutineTariffCalculatorPipe } from '../../../shared/pipes/routine-tariff-calculator.pipe';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SkillSelectionModalComponent } from '../skill-selection-modal/skill-selection-modal.component';
import { combineLatest, map, Observable, startWith, Subject } from 'rxjs';
import { DEFAULT_ROUTINE_TEMPLATE } from '../../../shared/data/skill-template';
import { RoutineTemplate } from '../../../models/routine-template.model';
import { ROUTINE_TEMPLATES } from '../../../shared/data/routine-templates';

export type SkillReplace = {
  skillIndex: number;
  skill: Skill;
};
@Component({
  selector: 'app-routine-builder',
  imports: [RoutineTariffCalculatorPipe, CommonModule, NgbAccordionModule],
  templateUrl: './routine-builder.component.html',
  styleUrl: './routine-builder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutineBuilderComponent {
  private readonly _modalService = inject(NgbModal);
  routine$: Observable<Skill[]>;
  routineTemplate$: Subject<RoutineTemplate>;
  skillReplace$: Subject<SkillReplace>;

  get defaultTemplate(): Skill[] {
    return DEFAULT_ROUTINE_TEMPLATE.routine;
  }

  protected readonly premadeRoutines =
    signal<RoutineTemplate[]>(ROUTINE_TEMPLATES);

  constructor() {
    this.routineTemplate$ = new Subject<RoutineTemplate>();
    this.skillReplace$ = new Subject<SkillReplace>();

    this.routine$ = combineLatest([
      this.routineTemplate$.asObservable().pipe(startWith(null)),
      this.skillReplace$.asObservable().pipe(startWith(null)),
    ]).pipe(
      map(([routineTemplate, skillReplace]) => {
        if (routineTemplate === null) return [];
        if (skillReplace === null) return routineTemplate.routine;

        return [
          ...this.replaceSkillInRoutine(routineTemplate.routine, skillReplace),
        ];
      }),
    );
  }

  openSkillSelectionModal(skill: Skill, skillIndex: number): void {
    const _modalRef = this._modalService.open(SkillSelectionModalComponent, {
      fullscreen: true,
      scrollable: true,
    });

    const componentInstance: SkillSelectionModalComponent =
      _modalRef.componentInstance;

    componentInstance.selectedSkill = skill;
    componentInstance.skillIndex = skillIndex;

    _modalRef.result
      .then((selectedSkill: Skill) => {
        this.skillReplace$.next({
          skill: selectedSkill,
          skillIndex: skillIndex,
        });
      })
      .catch(() => null);
  }

  private replaceSkillInRoutine(
    routine: Skill[],
    skillReplace: SkillReplace,
  ): Skill[] {
    routine[skillReplace.skillIndex] = skillReplace.skill;

    return routine;
  }

  selectRoutineTemplate(routineTemplate: RoutineTemplate): void {
    this.routineTemplate$.next(routineTemplate);
  }
}
