import * as fs from 'fs';

import {BufferSsmPresenter} from '../../../../../src/application/ssm/presenters/buffer-ssm-presenter';
import {FileNotExists} from '../../../../../src/core/errors/file-not-exists';
import {EnvironmentMock} from '../../../__mocks__/interfaces/environment-mock';
import {
  ProcessEnvBufferPathKey,
  ProcessEnvMock,
} from '../../../__mocks__/libs/nodejs-process-env-mock';

describe('Given Buffer Ssm Presenter', () => {
  let presenter: BufferSsmPresenter;

  beforeEach(() => {
    presenter = new BufferSsmPresenter(EnvironmentMock);
  });

  describe('When attempt to access file path from environment', () => {
    it('Should return buffer from path storage in environment key', async () => {
      const envBufferPath = ProcessEnvMock[ProcessEnvBufferPathKey];

      EnvironmentMock.getValueByKey.mockReturnValue(envBufferPath);

      const expectedBuffer = Buffer.from('content of file');
      jest.spyOn(fs, 'existsSync').mockReturnValue(true);
      jest.spyOn(fs, 'readFileSync').mockReturnValue(expectedBuffer);

      const value = await presenter.getValueByKey(ProcessEnvBufferPathKey);

      expect(value.equals(expectedBuffer)).toBeTruthy();
    });

    it('Should throw FileNotExists', () => {
      const envBufferPath = ProcessEnvMock[ProcessEnvBufferPathKey];

      EnvironmentMock.getValueByKey.mockReturnValue(envBufferPath);

      jest.spyOn(fs, 'existsSync').mockReturnValue(false);

      expect(() =>
        presenter.getValueByKey(ProcessEnvBufferPathKey)
      ).rejects.toThrow(FileNotExists.make(envBufferPath));
    });
  });
});
