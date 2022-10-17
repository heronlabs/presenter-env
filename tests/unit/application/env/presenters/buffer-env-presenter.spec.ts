import * as fs from 'fs';

import {BufferEnvPresenter} from '../../../../../src/application/env/presenters/buffer-env-presenter';
import {FileNotExists} from '../../../../../src/core/errors/file-not-exists';
import {EnvironmentMock} from '../../../__mocks__/interfaces/environment-mock';
import {
  ProcessEnvBufferPathKey,
  ProcessEnvMock,
} from '../../../__mocks__/libs/nodejs-process-env-mock';

describe('Given Environment Buffer Presenter', () => {
  let presenter: BufferEnvPresenter;

  beforeEach(() => {
    presenter = new BufferEnvPresenter(EnvironmentMock);
  });

  describe('When attempt to access file path from environment', () => {
    it('Should return buffer from path storage in environment key', () => {
      const envBufferPath = ProcessEnvMock[ProcessEnvBufferPathKey];

      EnvironmentMock.getValueByKey.mockReturnValue(envBufferPath);

      const expectedBuffer = Buffer.from('content of file');
      jest.spyOn(fs, 'existsSync').mockReturnValue(true);
      jest.spyOn(fs, 'readFileSync').mockReturnValue(expectedBuffer);

      const value = presenter.getValueByKey(ProcessEnvBufferPathKey);

      expect(value.equals(expectedBuffer)).toBeTruthy();
    });

    it('Should throw FileNotExists', () => {
      const envBufferPath = ProcessEnvMock[ProcessEnvBufferPathKey];

      EnvironmentMock.getValueByKey.mockReturnValue(envBufferPath);

      jest.spyOn(fs, 'existsSync').mockReturnValue(false);

      expect(() => presenter.getValueByKey(ProcessEnvBufferPathKey)).toThrow(
        FileNotExists.make(envBufferPath)
      );
    });
  });
});
