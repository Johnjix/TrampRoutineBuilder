import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Skill } from '../../../models/skill.model';
import { skills } from '../../../shared/data/skill-database';
import { RoutineTariffCalculatorPipe } from '../../../shared/pipes/routine-tariff-calculator.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routine-builder',
  standalone: true,
  imports: [RoutineTariffCalculatorPipe, CommonModule],
  templateUrl: './routine-builder.component.html',
  styleUrl: './routine-builder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutineBuilderComponent {
  routine: Skill[];

  constructor() {
    this.routine = [...skills];
  }
}
