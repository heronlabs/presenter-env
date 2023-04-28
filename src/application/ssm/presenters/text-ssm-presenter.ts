import {Inject} from '@nestjs/common';

import {Environment} from '../../../core/interfaces/environment';
import {ParameterService} from '../../../core/services/parameter-service';

export class TextSsmPresenter implements Environment<string> {
  async getValueByKey(key: string): Promise<string> {
    const value = await this.parameterService.getValueByKey(key);

    return value;
  }

  constructor(
    @Inject(ParameterService)
    private parameterService: Environment<string>
  ) {}
}
