import { RoutineTariffCalculatorPipe } from './routine-tariff-calculator.pipe';

fdescribe('RoutineTariffCalculatorPipe', () => {
  it('create an instance', () => {
    const pipe = new RoutineTariffCalculatorPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return 6.10', () => {
    const pipe = new RoutineTariffCalculatorPipe();

    const result = pipe.transform([
      {
        Name: 'Back S/S',
        Shape: 'straight',
        Takeoff: 'feet',
        Landing: 'feet',
        Tariff: 0.6,
        Fig: '',
      },
      {
        Name: 'Back S/S',
        Shape: 'pike',
        Takeoff: 'feet',
        Landing: 'feet',
        Tariff: 0.6,
        Fig: '',
      },
      {
        Name: 'Back S/S',
        Shape: 'tuck',
        Takeoff: 'feet',
        Landing: 'feet',
        Tariff: 0.6,
        Fig: '',
      },
      {
        Name: 'Back S/S to seat',
        Shape: 'tuck',
        Takeoff: 'feet',
        Landing: 'seat',
        Tariff: 0.6,
        Fig: '',
      },
      {
        Name: 'Back S/S to back',
        Shape: 'tuck',
        Takeoff: 'feet',
        Landing: 'back',
        Tariff: 0.7,
        Fig: '',
      },
      {
        Name: 'Back S/S to seat',
        Shape: 'pike',
        Takeoff: 'feet',
        Landing: 'seat',
        Tariff: 0.6,
        Fig: '',
      },
      {
        Name: 'Back S/S to seat',
        Shape: 'straight',
        Takeoff: 'feet',
        Landing: 'seat',
        Tariff: 0.6,
        Fig: '',
      },
      {
        Name: 'Barani',
        Shape: 'straight',
        Takeoff: 'feet',
        Landing: 'feet',
        Tariff: 0.6,
        Fig: '',
      },
      {
        Name: 'Barani',
        Shape: 'pike',
        Takeoff: 'feet',
        Landing: 'feet',
        Tariff: 0.6,
        Fig: '',
      },
      {
        Name: 'Barani',
        Shape: 'tuck',
        Takeoff: 'feet',
        Landing: 'feet',
        Tariff: 0.6,
        Fig: '',
      },
    ]);

    expect(result).toEqual(6.1);
  });
});
