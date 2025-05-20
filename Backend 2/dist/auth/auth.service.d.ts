import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly Prisma;
    private readonly Jwt;
    constructor(Prisma: PrismaService, Jwt: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
}
