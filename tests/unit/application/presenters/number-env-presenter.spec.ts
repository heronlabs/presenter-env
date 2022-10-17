import {ValueIsNotNumber} from '../../../../src/core/errors/value-is-not-number';
import {NumberEnvPresenter} from '../../../../src/entry-point';
import {EnvironmentMock} from '../../__mocks__/interfaces/environment-mock';
import {
  ProcessEnvMock,
  ProcessEnvNumberKey,
} from '../../__mocks__/libs/nodejs-process-env-mock';

describe('Given Number Env Presenter', () => {
  const service = new NumberEnvPresenter(EnvironmentMock);

  describe('When attempt to access number from environment', () => {
    it('Should return number from environment key', () => {
      const envNumber = ProcessEnvMock[ProcessEnvNumberKey];

      EnvironmentMock.getValueByKey.mockReturnValue(envNumber);

      const value = service.getValueByKey(ProcessEnvNumberKey);

      expect(value).toBe(envNumber);
    });

    it('Should throw ValueIsNotNumber', () => {
      const mockValue = 'NOT AN NUMBER';

      EnvironmentMock.getValueByKey.mockReturnValue(mockValue);

      expect(() => service.getValueByKey(ProcessEnvNumberKey)).toThrow(
        ValueIsNotNumber.make(ProcessEnvNumberKey)
      );
    });
  });
});
