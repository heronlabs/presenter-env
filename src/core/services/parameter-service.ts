import {SSM} from '@aws-sdk/client-ssm';
import {Inject} from '@nestjs/common';

import {ValueUndefined} from '../errors/value-undefined';
import {Environment} from '../interfaces/environment';
import {ProcessEnvService} from './process-env-service';

export class ParameterService implements Environment<string> {
  async getValueByKey(key: string): Promise<string> {
    const path = await this.processEnvService.getValueByKey(this.paramRoot);

    const result = await this.parameter.getParameter({
      Name: `${path}/${key}`,
      WithDecryption: true,
    });

    if (!result.Parameter || !result.Parameter.Value) {
      throw ValueUndefined.make(key);
    }

    const value = result.Parameter.Value;

    return value;
  }

  constructor(
    @Inject('Parameter') private parameter: SSM,
    @Inject(ProcessEnvService)
    private processEnvService: Environment<string>,
    @Inject('ParamRoot')
    private readonly paramRoot: string
  ) {}
}
