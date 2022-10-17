import {Inject} from '@nestjs/common';

import {ValueUndefined} from '../errors/value-undefined';
import {Environment} from '../interfaces/environment';

export class ProcessEnvService implements Environment<string> {
  getValueByKey(key: string): string {
    const value = this.processEnv[key];

    if (!value) {
      throw ValueUndefined.make(key);
    }

    return value;
  }

  constructor(@Inject('ProcessEnv') private processEnv: NodeJS.ProcessEnv) {}
}
