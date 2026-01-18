import { Pipe, PipeTransform } from '@angular/core';
import { Skill } from '../../models/skill.model';

@Pipe({
  name: 'filterBySkillName',
  standalone: true,
})
export class FilterBySkillNamePipe implements PipeTransform {
  transform(skills: Skill[], skillName: string): Skill[] {
    if (!skills) return [];
    if (skillName === null || skillName === '') return skills;

    const filteredSkills = skills.filter((skill) =>
      skill.name.toLowerCase().includes(skillName.toLowerCase()),
    );

    return filteredSkills;
  }
}
