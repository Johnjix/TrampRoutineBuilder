import { RoutineTemplate } from '../../models/routine-template.model';
import { skills } from './skill-database';

export const DEFAULT_ROUTINE_TEMPLATE: RoutineTemplate = {
  name: 'Default Routine',
  routine: [...skills].slice(0, 10),
};
