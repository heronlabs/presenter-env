import {Module, ModuleMetadata} from '@nestjs/common';

import {ProcessEnvService} from './services/process-env-service';

export const coreModule: ModuleMetadata = {
  providers: [
    {
      useFactory: () => process.env,
      provide: 'ProcessEnv',
    },
    ProcessEnvService,
  ],
  exports: [ProcessEnvService],
};
@Module(coreModule)
export class CoreBootstrap {}
