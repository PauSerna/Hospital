"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('El email ya está registrado.');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashedPassword,
                role_id: dto.role_id,
            },
        });
        return user;
    }
    async changePassword(userId, currentPassword, newPassword) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.BadRequestException('Usuario no encontrado');
        const passwordValid = await bcrypt.compare(currentPassword, user.password);
        if (!passwordValid)
            throw new common_1.BadRequestException('Contraseña actual incorrecta');
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
    }
    transporter = nodemailer.createTransport({
        host: "live.smtp.mailtrap.io",
        port: 587,
        auth: {
            user: 'api',
            pass: '41c1e7034d706bc778bad9614acd144c',
        },
    });
    async sendRecoveryEmail(email, randomKey) {
        await this.transporter.sendMail({
            from: 'sandbox@inbox.mailtrap.email',
            to: email,
            subject: 'Recuperación de Contraseña',
            text: `Tu código de recuperación es: ${randomKey}`,
        });
    }
    async requestPasswordRecovery(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new common_1.BadRequestException('Usuario no encontrado');
        const randomKey = (0, uuid_1.v4)();
        await this.prisma.user.update({
            where: { email },
            data: { random_key: randomKey }
        });
        await this.sendRecoveryEmail(email, randomKey);
        return randomKey;
    }
    async resetPassword(randomKey, newPassword) {
        const user = await this.prisma.user.findFirst({ where: { random_key: randomKey } });
        if (!user)
            throw new common_1.BadRequestException('Código de recuperación inválido');
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword, random_key: "" }
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map