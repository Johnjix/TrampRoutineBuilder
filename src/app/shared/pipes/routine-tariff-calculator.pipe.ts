import { Pipe, PipeTransform } from '@angular/core';
import { Skill } from '../../models/skill.model';

@Pipe({
  name: 'routineTariffCalculator',
  standalone: true,
})
export class RoutineTariffCalculatorPipe implements PipeTransform {
  transform(routine: Skill[] | null): number {
    if (!routine) return 0;

    return Number(
      routine
        .reduce<number>((accumulator, skill) => {
          return accumulator + skill.Tariff;
        }, 0)
        .toFixed(2)
    );
  }
}
