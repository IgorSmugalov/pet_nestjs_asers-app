import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import { jwtConfig } from './jwt.config';
import { pathConfig } from './path.congfig';
import { jwkConfig } from './jwk.config';
import { smtpConfig } from './smtp.congfig';
import { userConfig } from './user.config';
import { serverConfig } from './server.congfig';

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      load: [
        jwkConfig,
        jwtConfig,
        pathConfig,
        smtpConfig,
        userConfig,
        serverConfig,
      ],
    }),
  ],
})
export class ConfigModule {}
