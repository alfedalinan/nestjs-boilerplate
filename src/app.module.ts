import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ControllerModule } from './application/controllers/controller.module'
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service'
import { getEnvPath } from './shared/helpers/env.helper'


const envFilePath = getEnvPath(`${__dirname}/../`)

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ControllerModule,
  ]
})
export class AppModule {}