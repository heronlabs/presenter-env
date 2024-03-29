# Env

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Build Status](https://github.com/heronlabs/env/actions/workflows/main.yml/badge.svg?branch=main)

> This is module for access process environment

#

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![GTS](https://img.shields.io/badge/GTS-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://github.com/google/gts)
[![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)](https://github.com/facebook/jest)
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://docs.nestjs.com/)

## How it works

Given key from environment retrieve the value.

### Installation

```
npm install @heronlabs/presenter-env
```

```
yarn add @heronlabs/presenter-env
```

## Usage

```typescript
require('dotenv').config();

import {
  BufferEnvPresenter,
  EnvBootstrap,
  Environment,
  NumberEnvPresenter,
  TextEnvPresenter,
} from '@heronlabs/presenter-env';

import {Module, Inject} from '@nestjs/common';

export class Configuration {
  public server = {
    port: this.numberEnvPresenter.getValueByKey('API_PORT'),
  };

  public jwt = {
    publicKey: this.bufferEnvPresenter.getValueByKey('JWT_PUBLIC_KEY_PATH'),
    algorithm: this.textEnvPresenter.getValueByKey('JWT_ALGORITHM'),
  };

  constructor(
    @Inject(NumberEnvPresenter) private numberEnvPresenter: Environment<number>,
    @Inject(BufferEnvPresenter) private bufferEnvPresenter: Environment<Buffer>,
    @Inject(TextEnvPresenter) private textEnvPresenter: Environment<string>
  ) {}
}

@Module({
  providers: [Configuration],
  imports: [EnvBootstrap],
})
export class ApiBootstrap {}
```

## Built with

- [Dotenv](https://github.com/motdotla/dotenv)
