import { Skill } from './skill.model';

export type RoutineTemplate = {
  name: string;
  routine: (Skill | null)[];
};
