import { LandingPosition } from './landing-position.model';
import { Shape } from './shape.model';

export type Skill = {
  name: string;
  takeoff: LandingPosition;
  landing: LandingPosition;
  shape: Shape;
  tariff: number;
  fig: string;
};
