import {ValueUndefined} from '../../../../src/core/errors/value-undefined';
import {ProcessEnvService} from '../../../../src/core/services/process-env-service';
import {
  ProcessEnvMock,
  ProcessEnvMoq,
} from '../../__mocks__/libs/nodejs-process-env-mock';

describe('Given Process Env Service', () => {
  const service = new ProcessEnvService(ProcessEnvMoq);

  describe('When attempt to access value from environment', () => {
    it('Should return text from environment key', () => {
      const value = service.getValueByKey('foo');

      expect(value).toBe(ProcessEnvMock.foo);
    });

    it('Should throw value undefined', () => {
      const mockKey = 'NOT_MY_KEY';

      expect(() => service.getValueByKey(mockKey)).toThrow(
        ValueUndefined.make(mockKey)
      );
    });
  });
});
