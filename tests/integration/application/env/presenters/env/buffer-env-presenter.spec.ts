import {Test} from '@nestjs/testing';

import {envModule} from '../../../../../../src/application/env/env-bootstrap';
import {BufferEnvPresenter} from '../../../../../../src/application/env/presenters/buffer-env-presenter';
import {FileNotExists} from '../../../../../../src/core/errors/file-not-exists';

describe('Given Number Ssm Presenter', () => {
  let presenter: BufferEnvPresenter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(envModule).compile();

    presenter = moduleRef.get(BufferEnvPresenter);
  });

  describe('When attempt to access file path from environment', () => {
    it('Should return buffer from path storage in environment key', async () => {
      const value = await presenter.getValueByKey('ENV_BUFFER_PATH');

      const filePathFromRoot = require('path').join(
        __dirname,
        '../../../__factories__/foo.txt'
      );

      const file = Buffer.from(filePathFromRoot);

      expect(value.compare(file)).toBeTruthy();
    });

    it('Should throw FileNotExists', async () => {
      expect(() => presenter.getValueByKey('ENV_TEXT')).rejects.toThrow(
        FileNotExists.make('foo')
      );
    });
  });
});
