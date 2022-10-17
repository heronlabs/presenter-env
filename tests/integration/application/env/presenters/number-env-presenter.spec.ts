import {Test} from '@nestjs/testing';

import {envModule} from '../../../../../src/application/env/env-bootstrap';
import {ValueIsNotNumber} from '../../../../../src/core/errors/value-is-not-number';
import {NumberEnvPresenter} from '../../../../../src/entry-point';

describe('Given Number Env Presenter', () => {
  let presenter: NumberEnvPresenter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(envModule).compile();

    presenter = moduleRef.get(NumberEnvPresenter);
  });

  describe('When attempt to access number from environment', () => {
    it('Should return number from environment key', () => {
      const value = presenter.getValueByKey('ENV_NUMBER');

      expect(value).toBe(18);
    });

    it('Should throw ValueIsNotNumber', () => {
      expect(() => presenter.getValueByKey('ENV_TEXT')).toThrow(
        ValueIsNotNumber.make('ENV_TEXT')
      );
    });
  });
});
