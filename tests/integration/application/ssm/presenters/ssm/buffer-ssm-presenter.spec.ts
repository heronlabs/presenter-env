import {GetParameterCommandOutput} from '@aws-sdk/client-ssm';
import {faker} from '@faker-js/faker';
import {Test} from '@nestjs/testing';
import {Mock} from 'moq.ts';

import {BufferSsmPresenter} from '../../../../../../src/application/ssm/presenters/buffer-ssm-presenter';
import {SsmBootstrap} from '../../../../../../src/application/ssm/ssm-bootstrap';
import {FileNotExists} from '../../../../../../src/core/errors/file-not-exists';
import {SsmMock} from '../../../../../unit/__mocks__/libs/aws-ssm-mock';

jest.mock('@aws-sdk/client-ssm', () => ({
  SSM: class {
    getParameter = SsmMock.getParameter;
  },
}));

describe('Given Buffer Ssm Presenter', () => {
  let presenter: BufferSsmPresenter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SsmBootstrap.register('ENV_PARAM_ROOT')],
    }).compile();

    presenter = moduleRef.get(BufferSsmPresenter);
  });

  describe('When attempt to access file path from environment', () => {
    it('Should return buffer from path storage in environment key', async () => {
      const pathValue = './tests/integration/__factories__/foo.txt';

      SsmMock.getParameter.mockResolvedValueOnce(
        new Mock<GetParameterCommandOutput>()
          .setup(mock => mock.Parameter?.Value)
          .returns(pathValue)
          .object()
      );

      const path = faker.datatype.string();

      const value = await presenter.getValueByKey(path);

      const filePathFromRoot = require('path').join(
        __dirname,
        '../../../__factories__/foo.txt'
      );

      const file = Buffer.from(filePathFromRoot);

      expect(value.compare(file)).toBeTruthy();
    });

    it('Should throw FileNotExists', async () => {
      const pathValue = faker.datatype.string();

      SsmMock.getParameter.mockResolvedValueOnce(
        new Mock<GetParameterCommandOutput>()
          .setup(mock => mock.Parameter?.Value)
          .returns(pathValue)
          .object()
      );

      const path = faker.datatype.string();

      expect(() => presenter.getValueByKey(path)).rejects.toThrow(
        FileNotExists.make(pathValue)
      );
    });
  });
});
