import {GetParameterCommandOutput} from '@aws-sdk/client-ssm';
import {faker} from '@faker-js/faker';
import {Test} from '@nestjs/testing';
import {Mock} from 'moq.ts';

import {NumberSsmPresenter} from '../../../../../../src/application/ssm/presenters/number-ssm-presenter';
import {SsmBootstrap} from '../../../../../../src/application/ssm/ssm-bootstrap';
import {ValueIsNotNumber} from '../../../../../../src/core/errors/value-is-not-number';
import {SsmMock} from '../../../../../unit/__mocks__/libs/aws-ssm-mock';

jest.mock('@aws-sdk/client-ssm', () => ({
  SSM: class {
    getParameter = SsmMock.getParameter;
  },
}));

describe('Given Number Ssm Presenter', () => {
  let presenter: NumberSsmPresenter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SsmBootstrap.register('ENV_PARAM_ROOT')],
    }).compile();

    presenter = moduleRef.get(NumberSsmPresenter);
  });

  describe('When attempt to access number from environment', () => {
    it('Should return number from environment key', async () => {
      const numberValue = faker.datatype.number();
      const value = new Mock<GetParameterCommandOutput>()
        .setup(mock => mock.Parameter?.Value)
        .returns(`${numberValue}`)
        .object();

      SsmMock.getParameter.mockResolvedValueOnce(value);

      const path = faker.datatype.string();

      const result = await presenter.getValueByKey(path);

      expect(result).toBe(numberValue);
    });

    it('Should throw ValueIsNotNumber', async () => {
      const value = new Mock<GetParameterCommandOutput>()
        .setup(mock => mock.Parameter?.Value)
        .returns(faker.datatype.string())
        .object();

      SsmMock.getParameter.mockResolvedValueOnce(value);

      const path = faker.datatype.string();

      expect(() => presenter.getValueByKey(path)).rejects.toThrow(
        ValueIsNotNumber.make(path)
      );
    });
  });
});
