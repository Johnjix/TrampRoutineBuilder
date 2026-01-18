import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Skill } from '../../../models/skill.model';
import { RoutineTariffCalculatorPipe } from '../../../shared/pipes/routine-tariff-calculator.pipe';
import { CommonModule } from '@angular/common';
import {
  NgbAccordionModule,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { SkillSelectionModalComponent } from '../skill-selection-modal/skill-selection-modal.component';
import { combineLatest, map, Observable, startWith, Subject } from 'rxjs';
import { DefaultRoutineTemplate } from '../../../shared/data/skill-template';
import { RoutineTemplate } from '../../../models/routine-template.model';
import { ROUTINE_TEMPLATES } from '../../../shared/data/routine-templates';

export interface SkillReplace {
  SkillIndex: number;
  Skill: Skill;
}
@Component({
  selector: 'app-routine-builder',
  standalone: true,
  imports: [RoutineTariffCalculatorPipe, CommonModule, NgbAccordionModule],
  templateUrl: './routine-builder.component.html',
  styleUrl: './routine-builder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutineBuilderComponent {
  routine$: Observable<Skill[]>;
  routineTemplate$: Subject<RoutineTemplate>;
  skillReplace$: Subject<SkillReplace>;

  get defaultTemplate(): Skill[] {
    return DefaultRoutineTemplate.Routine;
  }

  get premadeRoutines(): RoutineTemplate[] {
    return ROUTINE_TEMPLATES;
  }

  constructor(private _modalService: NgbModal) {
    this.routineTemplate$ = new Subject<RoutineTemplate>();
    this.skillReplace$ = new Subject<SkillReplace>();

    this.routine$ = combineLatest([
      this.routineTemplate$.asObservable().pipe(startWith(null)),
      this.skillReplace$.asObservable().pipe(startWith(null)),
    ]).pipe(
      map(([routineTemplate, skillReplace]) => {
        if (routineTemplate === null) return [];
        if (skillReplace === null) return routineTemplate.Routine;

        return [
          ...this.replaceSkillInRoutine(routineTemplate.Routine, skillReplace),
        ];
      })
    );
  }

  public openSkillSelectionModal(skill: Skill, skillIndex: number): void {
    const _modalRef: NgbModalRef = this._modalService.open(
      SkillSelectionModalComponent,
      {
        fullscreen: true,
        scrollable: true,
      }
    );

    const componentInstance: SkillSelectionModalComponent =
      _modalRef.componentInstance;

    componentInstance.selectedSkill = skill;
    componentInstance.skillIndex = skillIndex;

    _modalRef.result
      .then((selectedSkill: Skill) => {
        this.skillReplace$.next({
          Skill: selectedSkill,
          SkillIndex: skillIndex,
        });
      })
      .catch(() => null);
  }

  private replaceSkillInRoutine(
    routine: Skill[],
    skillReplace: SkillReplace
  ): Skill[] {
    routine[skillReplace.SkillIndex] = skillReplace.Skill;

    return routine;
  }

  public selectRoutineTemplate(routineTemplate: RoutineTemplate): void {
    this.routineTemplate$.next(routineTemplate);
  }
}
