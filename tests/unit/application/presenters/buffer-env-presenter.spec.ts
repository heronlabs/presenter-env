import * as fs from 'fs';

import {BufferEnvPresenter} from '../../../../src/application/env/presenters/buffer-env-presenter';
import {FileNotExists} from '../../../../src/core/errors/file-not-exists';
import {EnvironmentMock} from '../../__mocks__/interfaces/environment-mock';
import {
  ProcessEnvBufferPathKey,
  ProcessEnvMock,
} from '../../__mocks__/libs/nodejs-process-env-mock';

describe('Given Environment Buffer Service', () => {
  const service = new BufferEnvPresenter(EnvironmentMock);

  describe('When attempt to access file path from environment', () => {
    it('Should return buffer from path storage in environment key', () => {
      const envBuffer = ProcessEnvMock[ProcessEnvBufferPathKey];

      EnvironmentMock.getValueByKey.mockReturnValue(envBuffer);

      const expectedBuffer = Buffer.from('content of file');
      jest.spyOn(fs, 'existsSync').mockReturnValue(true);
      jest.spyOn(fs, 'readFileSync').mockReturnValue(expectedBuffer);

      const value = service.getValueByKey(ProcessEnvBufferPathKey);

      expect(value.equals(expectedBuffer)).toBeTruthy();
    });

    it('Should throw FileNotExists', () => {
      const envBuffer = ProcessEnvMock[ProcessEnvBufferPathKey];

      EnvironmentMock.getValueByKey.mockReturnValue(envBuffer);

      jest.spyOn(fs, 'existsSync').mockReturnValue(false);

      expect(() => service.getValueByKey(ProcessEnvBufferPathKey)).toThrow(
        FileNotExists.make(envBuffer)
      );
    });
  });
});
