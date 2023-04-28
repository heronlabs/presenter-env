import {Inject} from '@nestjs/common';

import {ValueUndefined} from '../errors/value-undefined';
import {Environment} from '../interfaces/environment';

export class ProcessEnvService implements Environment<string> {
  async getValueByKey(key: string): Promise<string> {
    const value = this.processEnv[key];

    if (!value) {
      throw ValueUndefined.make(key);
    }

    return value;
  }

  constructor(@Inject('ProcessEnv') private processEnv: NodeJS.ProcessEnv) {}
}
