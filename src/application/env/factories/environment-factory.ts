import {INestApplicationContext} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {EnvBootstrap} from '../env-bootstrap';
import {BufferEnvPresenter} from '../presenters/buffer-env-presenter';
import {NumberEnvPresenter} from '../presenters/number-env-presenter';
import {TextEnvPresenter} from '../presenters/text-env-presenter';

export class EnvironmentFactory {
  public makeText(): TextEnvPresenter {
    return this.app.get(TextEnvPresenter);
  }

  public makeNumber(): NumberEnvPresenter {
    return this.app.get(NumberEnvPresenter);
  }

  public makeBuffer(): BufferEnvPresenter {
    return this.app.get(BufferEnvPresenter);
  }

  private constructor(private app: INestApplicationContext) {}

  static async make(): Promise<EnvironmentFactory> {
    const app = await NestFactory.createApplicationContext(EnvBootstrap, {
      logger: false,
    });

    return new EnvironmentFactory(app);
  }
}
