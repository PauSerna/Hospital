import { CiideService } from './ciide.service';
export declare class CiideController {
    private readonly ciideService;
    constructor(ciideService: CiideService);
    getOptions(): {
        options: string[];
    };
}
