import { Pipe, PipeTransform } from '@angular/core';
import { Skill } from '../../models/skill.model';

@Pipe({
  name: 'filterByMaxDifficulty',
  standalone: true,
})
export class FilterByMaxDifficultyPipe implements PipeTransform {
  transform(skills: Skill[], skillMaxDifficulty: number | null): Skill[] {
    if (!skills) return [];
    if (skillMaxDifficulty === null) return skills;
    if (skillMaxDifficulty < 0) return skills;

    const filteredSkills = skills.filter(
      (skill) => skill.Tariff <= skillMaxDifficulty
    );

    return filteredSkills;
  }
}
