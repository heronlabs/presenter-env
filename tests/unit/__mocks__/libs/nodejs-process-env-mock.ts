import {Mock} from 'moq.ts';

export const ProcessEnvTextKey = 'foo';
export const ProcessEnvNumberKey = 'bar';
export const ProcessEnvBufferPathKey = 'baz';

export const ProcessEnvMock = {
  [ProcessEnvTextKey]: 'bar',
  [ProcessEnvNumberKey]: 18,
  [ProcessEnvBufferPathKey]: 'baz/foo.pem',
};

export const ProcessEnvMoq = new Mock<NodeJS.ProcessEnv>()
  .setup(mock => mock.foo)
  .returns(ProcessEnvMock.foo)
  .object();
