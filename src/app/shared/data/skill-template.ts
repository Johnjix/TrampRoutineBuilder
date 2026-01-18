import { RoutineTemplate } from '../../models/routine-template.model';
import { skills } from './skill-database';

export const DefaultRoutineTemplate: RoutineTemplate = {
  Name: 'Default Routine',
  Routine: [...skills].slice(0, 10),
};
