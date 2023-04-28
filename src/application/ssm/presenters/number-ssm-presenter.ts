import {Inject} from '@nestjs/common';

import {ValueIsNotNumber} from '../../../core/errors/value-is-not-number';
import {Environment} from '../../../core/interfaces/environment';
import {ParameterService} from '../../../core/services/parameter-service';

export class NumberSsmPresenter implements Environment<number> {
  async getValueByKey(key: string): Promise<number> {
    const value = await this.parameterService.getValueByKey(key);

    const valueAsNumber = Number(value);

    if (isNaN(valueAsNumber)) {
      throw ValueIsNotNumber.make(key);
    }

    return valueAsNumber;
  }

  constructor(
    @Inject(ParameterService)
    private parameterService: Environment<string>
  ) {}
}
