import { Controller,Get } from '@nestjs/common';
import { CiideService } from './ciide.service';

@Controller('ciide')
export class CiideController {
    constructor(private readonly ciideService: CiideService) {}
    
    @Get('options')
    getOptions() {
      return this.ciideService.getAppOptions();
    }
}
