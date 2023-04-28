import {Inject} from '@nestjs/common';
import {existsSync, readFileSync} from 'fs';

import {FileNotExists} from '../../../core/errors/file-not-exists';
import {Environment} from '../../../core/interfaces/environment';
import {ParameterService} from '../../../core/services/parameter-service';

export class BufferSsmPresenter implements Environment<Buffer> {
  async getValueByKey(key: string): Promise<Buffer> {
    const path = await this.parameterService.getValueByKey(key);

    const fileExists = existsSync(path);

    if (!fileExists) {
      throw FileNotExists.make(path);
    }

    const file = readFileSync(path);
    return file;
  }

  constructor(
    @Inject(ParameterService)
    private parameterService: Environment<string>
  ) {}
}
