import {TextEnvPresenter} from '../../../../../src/entry-point';
import {EnvironmentMock} from '../../../__mocks__/interfaces/environment-mock';
import {
  ProcessEnvMock,
  ProcessEnvTextKey,
} from '../../../__mocks__/libs/nodejs-process-env-mock';

describe('Given Text Env Presenter', () => {
  let presenter: TextEnvPresenter;

  beforeEach(() => {
    presenter = new TextEnvPresenter(EnvironmentMock);
  });

  describe('When attempt to access text from environment', () => {
    it('Should return text from environment key', () => {
      const textValue = ProcessEnvMock[ProcessEnvTextKey];

      EnvironmentMock.getValueByKey.mockReturnValue(textValue);

      const value = presenter.getValueByKey(ProcessEnvTextKey);

      expect(value).toBe(textValue);
    });
  });
});
