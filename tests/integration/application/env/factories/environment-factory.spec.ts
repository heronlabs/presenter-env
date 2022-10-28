import {EnvironmentFactory} from '../../../../../src/application/env/factories/environment-factory';

describe('Given Environment Factory', () => {
  let factory: EnvironmentFactory;

  beforeEach(async () => {
    factory = await EnvironmentFactory.make();
  });

  describe('When attempt to get presenters', () => {
    it('Should return text presenter environment', () => {
      const constructorName = factory.makeText().constructor.name;

      expect(constructorName).toBe('TextEnvPresenter');
    });

    it('Should return number presenter environment', () => {
      const constructorName = factory.makeNumber().constructor.name;

      expect(constructorName).toBe('NumberEnvPresenter');
    });

    it('Should return buffer presenter environment', () => {
      const constructorName = factory.makeBuffer().constructor.name;

      expect(constructorName).toBe('BufferEnvPresenter');
    });
  });
});
