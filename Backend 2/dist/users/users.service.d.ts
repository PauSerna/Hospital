import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(dto: CreateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        role_id: number;
        id: number;
        random_key: string;
        created_at: Date;
    }>;
    changePassword(userId: number, currentPassword: string, newPassword: string): Promise<void>;
    private transporter;
    sendRecoveryEmail(email: string, randomKey: string): Promise<void>;
    requestPasswordRecovery(email: string): Promise<string>;
    resetPassword(randomKey: string, newPassword: string): Promise<void>;
}
