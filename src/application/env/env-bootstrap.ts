import {Module} from '@nestjs/common';

import {BufferEnvPresenter} from './presenters/buffer-env-presenter';
import {NumberEnvPresenter} from './presenters/number-env-presenter';
import {TextEnvPresenter} from './presenters/text-env-presenter';

export const envModule = {
  providers: [TextEnvPresenter, NumberEnvPresenter, BufferEnvPresenter],
  exports: [TextEnvPresenter, NumberEnvPresenter, BufferEnvPresenter],
};
@Module(envModule)
export class EnvBootstrap {}
