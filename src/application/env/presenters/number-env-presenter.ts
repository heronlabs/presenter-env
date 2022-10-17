import {Inject} from '@nestjs/common';

import {ValueIsNotNumber} from '../../../core/errors/value-is-not-number';
import {Environment} from '../../../core/interfaces/environment';
import {ProcessEnvService} from '../../../core/services/process-env-service';

export class NumberEnvPresenter implements Environment<number> {
  getValueByKey(key: string): number {
    const value = this.processEnvService.getValueByKey(key);

    const valueAsNumber = Number(value);

    if (isNaN(valueAsNumber)) {
      throw ValueIsNotNumber.make(key);
    }

    return valueAsNumber;
  }

  constructor(
    @Inject(ProcessEnvService)
    private processEnvService: Environment<string>
  ) {}
}
