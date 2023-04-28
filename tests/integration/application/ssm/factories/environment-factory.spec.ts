import {faker} from '@faker-js/faker';

import {ParameterFactory} from '../../../../../src/entry-point';

describe('Given Environment Factory', () => {
  let factory: ParameterFactory;

  beforeEach(async () => {
    factory = await ParameterFactory.make(faker.datatype.string());
  });

  describe('When attempt to get presenters', () => {
    it('Should return text presenter environment', () => {
      const constructorName = factory.makeText().constructor.name;

      expect(constructorName).toBe('TextSsmPresenter');
    });

    it('Should return number presenter environment', () => {
      const constructorName = factory.makeNumber().constructor.name;

      expect(constructorName).toBe('NumberSsmPresenter');
    });

    it('Should return buffer presenter environment', () => {
      const constructorName = factory.makeBuffer().constructor.name;

      expect(constructorName).toBe('BufferSsmPresenter');
    });
  });
});
