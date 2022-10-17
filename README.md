# Env

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Build Status](https://github.com/heronlabs/env/actions/workflows/main.yml/badge.svg?branch=main)

> This is module for access process environment

#

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![GTS](https://img.shields.io/badge/GTS-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://github.com/google/gts)
[![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)](https://github.com/facebook/jest)
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://docs.nestjs.com/)
[![NPM](https://img.shields.io/npm/v/@heronlabs/env?style=for-the-badge)](https://www.npmjs.com/package/@heronlabs/env)

## How it works

Given key from environment retrieve the value.

### Installation

```
npm install -g @heronlabs/env
```

## Usage

```typescript
import {BufferEnvPresenter, EnvBootstrap, Environment, NumberEnvPresenter, TextEnvPresenter} from '@heronlabs/env';
import {Module, Inject} from '@nestjs/common';
import {Algorithm} from 'jsonwebtoken';

import {IApiConfiguration} from './interfaces/api-configuration';

@Module({
  providers: [],
  imports: [EnvBootstrap],
  controllers: [],
})
export class ApiBootstrap {}

export class ApiConfiguration implements IApiConfiguration {
  public server = {
    port: this.numberEnvPresenter.getValueByKey('API_PORT'),
  };

  public jwt = {
    publicKey: this.processEnvBufferService.getValueByKey(
      'JWT_PUBLIC_KEY_PATH'
    ),
    algorithm: this.processEnvTextService.getValueByKey('JWT_ALGORITHM'),
  };

  constructor(
    @Inject(NumberEnvPresenter) private numberEnvPresenter: Environment<number>,
    @Inject(BufferEnvPresenter) private bufferEnvPresenter: IEnvironment<Buffer>,
    @Inject(TextEnvPresenter) private textEnvPresenter: IEnvironment<Algorithm>
  ) {}
```

## Build

The Dockerfile is an example for Node environments and may change depending on the resources used in the headless browser.

## Built with

- [Dotenv](https://github.com/motdotla/dotenv)
