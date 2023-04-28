import {faker} from '@faker-js/faker';

import {ValueUndefined} from '../../../../src/core/errors/value-undefined';
import {ParameterService} from '../../../../src/core/services/parameter-service';
import {EnvironmentMock} from '../../__mocks__/interfaces/environment-mock';
import {SsmMock, SsmMoq} from '../../__mocks__/libs/aws-ssm-mock';

describe('Given Parameter Service', () => {
  const service = new ParameterService(
    SsmMoq,
    EnvironmentMock,
    faker.datatype.string()
  );

  describe('When attempt to access value from environment', () => {
    it('Should return text from environment key', async () => {
      const path = faker.datatype.string();

      EnvironmentMock.getValueByKey.mockReturnValue(path);

      const value = {
        Parameter: {
          Value: faker.datatype.string(),
        },
      };

      SsmMock.getParameter.mockResolvedValueOnce(value);

      const result = await service.getValueByKey('foo');

      expect(result).toBe(value.Parameter.Value);
    });

    it('Should throw value undefined', async () => {
      const path = faker.datatype.string();

      EnvironmentMock.getValueByKey.mockReturnValue(path);

      const value = {
        Parameter: undefined,
      };

      SsmMock.getParameter.mockResolvedValueOnce(value);

      expect(() => service.getValueByKey('foo')).rejects.toThrow(
        ValueUndefined.make('foo')
      );
    });
  });
});
