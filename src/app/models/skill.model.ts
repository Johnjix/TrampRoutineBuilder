import { LandingPosition } from './landing-position.model';
import { Shape } from './shape.model';

export interface Skill {
  Name: string;
  Takeoff: LandingPosition;
  Landing: LandingPosition;
  Shape: Shape;
  Tariff: number;
  Fig: string;
}
