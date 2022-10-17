import {Mock} from 'moq.ts';

export const ProcessEnvTextKey = 'FOO';
export const ProcessEnvNumberKey = 'BAR';
export const ProcessEnvBufferPathKey = 'BAZ';

export const ProcessEnvMock = {
  [ProcessEnvTextKey]: 'bar',
  [ProcessEnvNumberKey]: 18,
  [ProcessEnvBufferPathKey]: 'baz/foo.pem',
};

export const ProcessEnvMoq = new Mock<NodeJS.ProcessEnv>()
  .setup(mock => mock.foo)
  .returns(ProcessEnvMock[ProcessEnvTextKey])
  .object();
