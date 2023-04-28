import {SSM} from '@aws-sdk/client-ssm';
import {DynamicModule, Module} from '@nestjs/common';

import {ParameterService} from './services/parameter-service';
import {ProcessEnvService} from './services/process-env-service';

@Module({})
export class CoreBootstrap {
  static register(paramRoot: string): DynamicModule {
    return {
      module: CoreBootstrap,
      providers: [
        {
          useFactory: () => process.env,
          provide: 'ProcessEnv',
        },
        {
          useFactory: () => new SSM({apiVersion: '2014-11-06'}),
          provide: 'Parameter',
        },
        {
          provide: 'ParamRoot',
          useFactory: () => paramRoot,
        },
        ProcessEnvService,
        ParameterService,
      ],
      exports: [ProcessEnvService, ParameterService],
    };
  }
}
