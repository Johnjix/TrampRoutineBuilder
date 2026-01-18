import { RoutineTariffCalculatorPipe } from './routine-tariff-calculator.pipe';

describe('RoutinetariffCalculatorPipe', () => {
  it('create an instance', () => {
    const pipe = new RoutineTariffCalculatorPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return 6.10', () => {
    const pipe = new RoutineTariffCalculatorPipe();

    const result = pipe.transform([
      {
        name: 'Back S/S',
        shape: 'straight',
        takeoff: 'feet',
        landing: 'feet',
        tariff: 0.6,
        fig: '',
      },
      {
        name: 'Back S/S',
        shape: 'pike',
        takeoff: 'feet',
        landing: 'feet',
        tariff: 0.6,
        fig: '',
      },
      {
        name: 'Back S/S',
        shape: 'tuck',
        takeoff: 'feet',
        landing: 'feet',
        tariff: 0.6,
        fig: '',
      },
      {
        name: 'Back S/S to seat',
        shape: 'tuck',
        takeoff: 'feet',
        landing: 'seat',
        tariff: 0.6,
        fig: '',
      },
      {
        name: 'Back S/S to back',
        shape: 'tuck',
        takeoff: 'feet',
        landing: 'back',
        tariff: 0.7,
        fig: '',
      },
      {
        name: 'Back S/S to seat',
        shape: 'pike',
        takeoff: 'feet',
        landing: 'seat',
        tariff: 0.6,
        fig: '',
      },
      {
        name: 'Back S/S to seat',
        shape: 'straight',
        takeoff: 'feet',
        landing: 'seat',
        tariff: 0.6,
        fig: '',
      },
      {
        name: 'Barani',
        shape: 'straight',
        takeoff: 'feet',
        landing: 'feet',
        tariff: 0.6,
        fig: '',
      },
      {
        name: 'Barani',
        shape: 'pike',
        takeoff: 'feet',
        landing: 'feet',
        tariff: 0.6,
        fig: '',
      },
      {
        name: 'Barani',
        shape: 'tuck',
        takeoff: 'feet',
        landing: 'feet',
        tariff: 0.6,
        fig: '',
      },
    ]);

    expect(result).toEqual(6.1);
  });
});
