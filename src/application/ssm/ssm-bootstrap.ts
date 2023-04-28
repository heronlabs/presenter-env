import {DynamicModule, Module} from '@nestjs/common';

import {CoreBootstrap} from '../../core/core-bootstrap';
import {BufferSsmPresenter} from './presenters/buffer-ssm-presenter';
import {NumberSsmPresenter} from './presenters/number-ssm-presenter';
import {TextSsmPresenter} from './presenters/text-ssm-presenter';

@Module({})
export class SsmBootstrap {
  static register(paramRoot: string): DynamicModule {
    return {
      module: SsmBootstrap,
      providers: [TextSsmPresenter, NumberSsmPresenter, BufferSsmPresenter],
      exports: [TextSsmPresenter, NumberSsmPresenter, BufferSsmPresenter],
      imports: [CoreBootstrap.register(paramRoot)],
    };
  }
}
