import {Inject} from '@nestjs/common';

import {Environment} from '../../../core/interfaces/environment';
import {ProcessEnvService} from '../../../core/services/process-env-service';

export class TextEnvPresenter implements Environment<string> {
  getValueByKey(key: string): string {
    const value = this.processEnvService.getValueByKey(key);

    return value;
  }

  constructor(
    @Inject(ProcessEnvService)
    private processEnvService: Environment<string>
  ) {}
}
