import {GetParameterCommandOutput} from '@aws-sdk/client-ssm';
import {faker} from '@faker-js/faker';
import {Test} from '@nestjs/testing';
import {Mock} from 'moq.ts';

import {TextSsmPresenter} from '../../../../../../src/application/ssm/presenters/text-ssm-presenter';
import {SsmBootstrap} from '../../../../../../src/application/ssm/ssm-bootstrap';
import {ValueUndefined} from '../../../../../../src/core/errors/value-undefined';
import {SsmMock} from '../../../../../unit/__mocks__/libs/aws-ssm-mock';

jest.mock('@aws-sdk/client-ssm', () => ({
  SSM: class {
    getParameter = SsmMock.getParameter;
  },
}));

describe('Given Text Ssm Presenter', () => {
  let presenter: TextSsmPresenter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SsmBootstrap.register('ENV_PARAM_ROOT')],
    }).compile();

    presenter = moduleRef.get(TextSsmPresenter);
  });

  describe('When attempt to access text from environment', () => {
    it('Should return text from environment key', async () => {
      const value = new Mock<GetParameterCommandOutput>()
        .setup(mock => mock.Parameter?.Value)
        .returns(faker.datatype.string())
        .object();

      SsmMock.getParameter.mockResolvedValueOnce(value);

      const path = faker.datatype.string();

      const result = await presenter.getValueByKey(path);

      expect(result).toBe(value.Parameter?.Value);
    });
  });

  describe('When attempt to access undefined value', () => {
    it('Should throw value undefined', async () => {
      const value = new Mock<GetParameterCommandOutput>()
        .setup(mock => mock.Parameter)
        .returns(undefined)
        .object();

      SsmMock.getParameter.mockResolvedValueOnce(value);

      const path = faker.datatype.string();

      expect(() => presenter.getValueByKey(path)).rejects.toThrow(
        ValueUndefined.make(path)
      );
    });
  });
});
