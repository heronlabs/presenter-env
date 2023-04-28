import {faker} from '@faker-js/faker';
import {Test} from '@nestjs/testing';

import {envModule} from '../../../../../../src/application/env/env-bootstrap';
import {ValueUndefined} from '../../../../../../src/core/errors/value-undefined';
import {TextEnvPresenter} from '../../../../../../src/entry-point';

describe('Given Text Env Presenter', () => {
  let presenter: TextEnvPresenter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(envModule).compile();

    presenter = moduleRef.get(TextEnvPresenter);
  });

  describe('When attempt to access text from environment', () => {
    it('Should return text from environment key', async () => {
      const value = await presenter.getValueByKey('ENV_TEXT');

      expect(value).toBe('foo');
    });
  });

  describe('When attempt to access undefined value', () => {
    it('Should throw value undefined', async () => {
      const mockKey = faker.name.firstName();

      expect(() => presenter.getValueByKey(mockKey)).rejects.toThrow(
        ValueUndefined.make(mockKey)
      );
    });
  });
});
