import { Module } from '@nestjs/common';
import { CiideController } from './ciide.controller';
import { CiideService } from './ciide.service';

@Module({
  controllers: [CiideController],
  providers: [CiideService]
})
export class CiideModule {}
