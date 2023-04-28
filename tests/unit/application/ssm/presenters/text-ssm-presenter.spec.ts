import {TextSsmPresenter} from '../../../../../src/application/ssm/presenters/text-ssm-presenter';
import {EnvironmentMock} from '../../../__mocks__/interfaces/environment-mock';
import {
  ProcessEnvMock,
  ProcessEnvTextKey,
} from '../../../__mocks__/libs/nodejs-process-env-mock';

describe('Given Text Ssm Presenter', () => {
  let presenter: TextSsmPresenter;

  beforeEach(() => {
    presenter = new TextSsmPresenter(EnvironmentMock);
  });

  describe('When attempt to access text from environment', () => {
    it('Should return text from environment key', async () => {
      const textValue = ProcessEnvMock[ProcessEnvTextKey];

      EnvironmentMock.getValueByKey.mockReturnValue(textValue);

      const value = await presenter.getValueByKey(ProcessEnvTextKey);

      expect(value).toBe(textValue);
    });
  });
});
