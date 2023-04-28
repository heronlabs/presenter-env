import {SSM} from '@aws-sdk/client-ssm';
import {Mock} from 'moq.ts';

export const SsmMock = {
  getParameter: jest.fn(),
};

export const SsmMoq = new Mock<SSM>()
  .setup(mock => mock.getParameter)
  .returns(SsmMock.getParameter)
  .object();
