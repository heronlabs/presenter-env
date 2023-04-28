import {INestApplicationContext} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {BufferSsmPresenter} from '../presenters/buffer-ssm-presenter';
import {NumberSsmPresenter} from '../presenters/number-ssm-presenter';
import {TextSsmPresenter} from '../presenters/text-ssm-presenter';
import {SsmBootstrap} from '../ssm-bootstrap';

export class ParameterFactory {
  public makeText(): TextSsmPresenter {
    return this.app.get(TextSsmPresenter);
  }

  public makeNumber(): NumberSsmPresenter {
    return this.app.get(NumberSsmPresenter);
  }

  public makeBuffer(): BufferSsmPresenter {
    return this.app.get(BufferSsmPresenter);
  }

  private constructor(private app: INestApplicationContext) {}

  static async make(paramRoot: string): Promise<ParameterFactory> {
    const app = await NestFactory.createApplicationContext(
      SsmBootstrap.register(paramRoot),
      {
        logger: false,
      }
    );

    return new ParameterFactory(app);
  }
}
