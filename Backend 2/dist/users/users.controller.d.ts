import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/changepassword.dto';
import { RecoverPasswordDto, ResetPasswordDto } from './dto/recoverpassword.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
        password: string;
        role_id: number;
        id: number;
        random_key: string;
        created_at: Date;
    }>;
    getProfile(req: any): {
        message: string;
        user: any;
    };
    changePassword(req: any, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    recoverPassword(dto: RecoverPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
