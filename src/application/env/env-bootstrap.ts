import {Module, ModuleMetadata} from '@nestjs/common';

import {CoreBootstrap} from '../../core/core-bootstrap';
import {BufferEnvPresenter} from './presenters/buffer-env-presenter';
import {NumberEnvPresenter} from './presenters/number-env-presenter';
import {TextEnvPresenter} from './presenters/text-env-presenter';

export const envModule: ModuleMetadata = {
  providers: [TextEnvPresenter, NumberEnvPresenter, BufferEnvPresenter],
  exports: [TextEnvPresenter, NumberEnvPresenter, BufferEnvPresenter],
  imports: [CoreBootstrap.register('')],
};
@Module(envModule)
export class EnvBootstrap {}
