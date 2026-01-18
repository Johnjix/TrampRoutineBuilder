import { Pipe, PipeTransform } from '@angular/core';
import { Skill } from '../../models/skill.model';
import { Shape } from '../../models/shape.model';

@Pipe({
  name: 'filterBySkillShape',
  standalone: true,
})
export class FilterBySkillShapePipe implements PipeTransform {
  transform(skills: Skill[], skillShape: Shape | null): Skill[] {
    if (!skills) return [];
    if (skillShape === null) return skills;

    const filteredSkills = skills.filter((skill) =>
      skill.shape.includes(skillShape),
    );

    return filteredSkills;
  }
}
