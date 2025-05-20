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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const changepassword_dto_1 = require("./dto/changepassword.dto");
const recoverpassword_dto_1 = require("./dto/recoverpassword.dto");
const passport_1 = require("@nestjs/passport");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async register(createUserDto) {
        return this.usersService.createUser(createUserDto);
    }
    getProfile(req) {
        return { message: 'Ruta protegida', user: req.user };
    }
    async changePassword(req, dto) {
        await this.usersService.changePassword(dto.userId, dto.currentPassword, dto.newPassword);
        return { message: 'Contraseña actualizada exitosamente' };
    }
    async recoverPassword(dto) {
        await this.usersService.requestPasswordRecovery(dto.email);
        return { message: 'Se ha enviado el código de recuperación al correo' };
    }
    async resetPassword(dto) {
        await this.usersService.resetPassword(dto.randomKey, dto.newPassword);
        return { message: 'Contraseña actualizada exitosamente' };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('changepassword'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, changepassword_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('recoverpassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recoverpassword_dto_1.RecoverPasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "recoverPassword", null);
__decorate([
    (0, common_1.Post)('resetpassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recoverpassword_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "resetPassword", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map