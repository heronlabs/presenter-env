import {Module} from '@nestjs/common';

import {BufferEnvPresenter} from '../application/env/presenters/buffer-env-presenter';
import {NumberEnvPresenter} from '../application/env/presenters/number-env-presenter';
import {TextEnvPresenter} from '../application/env/presenters/text-env-presenter';
import {ProcessEnvService} from './services/process-env-service';

export const coreModule = {
  providers: [
    {
      useFactory: () => process.env,
      provide: 'ProcessEnv',
    },
    ProcessEnvService,
    TextEnvPresenter,
    NumberEnvPresenter,
    BufferEnvPresenter,
  ],
  exports: [TextEnvPresenter, NumberEnvPresenter, BufferEnvPresenter],
};
@Module(coreModule)
export class CoreBootstrap {}
