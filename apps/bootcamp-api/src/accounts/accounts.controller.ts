import { Controller, Post, Body, Get, Param, ParseUUIDPipe, Put, Delete, HttpCode, HttpStatus, UseGuards, Request, UseInterceptors, Res } from '@nestjs/common';
// import { AccountsService } from './accounts.service';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiUseTags, ApiOkResponse, ApiNotFoundResponse, ApiConflictResponse, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { CreateAccountDto } from './dto/create-account.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { VerifyUuidDto } from './dto/verify-uuid.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Request as ExpressRequest } from 'express';
import { AccountsErrorInterceptor } from './common/accounts-error.interceptor';
import { InetLocationDto } from './dto/inet-location.dto';
import { LoginGuard } from '../auth/guards/login.guard';

import { Response } from 'express';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { GetByIdAccountFacade } from './api.get-by-id/get-by-id.accounts.facade';
import { GetByEmailAccountFacade } from './api.get-by-email/get-by-email.accounts.facade';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PutAccountFacade } from './api.put/put.accounts.facade';
import { DeleteAccountFacade } from './api.delete/delete.accounts.facade';
import { CreateAccountFacade } from './api.create/create.accounts.facade';
import { VerifyEmailAccountFacade } from './api.verify-email/verify-email.accounts.facade';
import { LoginAccountFacade } from './api.login/login.accounts.facade';
import { LoggedInUser } from '@btcp/bootcamp-entities';
import { RefreshAccessTokenAccountFacade } from './api.refresh-access-token/refresh.access.token.accounts.facade';
import { ForgotPasswordAccountFacade } from './api.forgot-pasword/forgot-password.accounts.facade';
import { ForgotPasswordVerifyAccountFacade } from './api.forgot-password-verify/forgot-password-verify.accounts.facade';
import { ResetPasswordAccountFacade } from './api.reset-password/reset-password.accounts.facade';
import { GetAllAccountFacade } from './api.get-all/get-all.accounts.facade';
import { GetAllAccountFactory } from './api.get-all/get-all.accounts.factory';
import { GetByEmailAccountFactory } from './api.get-by-email/get-by-email.accounts.factory';
import { GetByIdAccountFactory } from './api.get-by-id/get-by-id.accounts.factory';
import { PutAccountFactory } from './api.put/put.accounts.factory';
import { DeleteAccountFactory } from './api.delete/delete.accounts.factory';
import { CreateAccountFactory } from './api.create/create.accounts.factory';
import { VerifyEmailAccountFactory } from './api.verify-email/verify-email.accounts.factory';
import { LoginAccountFactory } from './api.login/login.accounts.factory';
import { RefreshAccessTokenAccountFactory } from './api.refresh-access-token/refresh.access.token.accounts.factory';
import { ForgotPasswordAccountFactory } from './api.forgot-pasword/forgot-password.accounts.factory';
import { ForgotPasswordVerifyAccountFactory } from './api.forgot-password-verify/forgot-password-verify.accounts.factory';
import { ResetPasswordAccountFactory } from './api.reset-password/reset-password.accounts.factory';

@Controller('accounts')
@ApiUseTags('Accounts')
export class AccountsController {
    constructor(@InjectConnection() private readonly connection: Connection) {}

    @Get()
    @UseGuards(RolesGuard)
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'Data recieved'})
    @ApiUnauthorizedResponse({ description: 'Not authorized.'})
    @ApiForbiddenResponse({description: 'User has not permitted to this api.'})
    public async getAllAccounts(@Res() res: Response) {
        await new GetAllAccountFacade(new GetAllAccountFactory(this.connection, res)).exec();
    }

    @Get('email/:email')
    public async findOneByEmail(
        @Res() res: Response, 
        @Param('email') email: string
    ) {
        const controller = new GetByEmailAccountFactory(this.connection, res);
        await new GetByEmailAccountFacade(controller).exec(email);
    }

    @Get(':id')
    public async findOneById(
        @Res() res: Response, 
        @Param('id', new ParseUUIDPipe()) id: string) {

        await new GetByIdAccountFacade(new GetByIdAccountFactory(this.connection, res)).exec(id);
    }

    @Put(':id')
    public async update(
        @Res() res: Response, 
        @Param('id', new ParseUUIDPipe()) id: string, 
        @Body() updateAccountDto: UpdateAccountDto) {

            updateAccountDto.id = id;
            await new PutAccountFacade(new PutAccountFactory(this.connection, res)).exec(updateAccountDto);
    }

    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles('admin')
    @UseInterceptors(AccountsErrorInterceptor)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'The record has been successfully deleted.'})
    @ApiBadRequestResponse({description: 'account does not exist.'})
    @ApiUnauthorizedResponse({ description: 'Not authorized.'})
    @ApiForbiddenResponse({description: 'User has not permitted to this api.'})
    public async delete(
        @Res() res: Response, 
        @Param('id') id: string) {

        await new DeleteAccountFacade(new DeleteAccountFactory(this.connection, res)).exec(id);
    }

    // ╔═╗╦ ╦╔╦╗╦ ╦╔═╗╔╗╔╔╦╗╦╔═╗╔═╗╔╦╗╔═╗
    // ╠═╣║ ║ ║ ╠═╣║╣ ║║║ ║ ║║  ╠═╣ ║ ║╣
    // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝╝╚╝ ╩ ╩╚═╝╩ ╩ ╩ ╚═╝
    
    @Post()
    @UseInterceptors(AccountsErrorInterceptor)
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({description: 'The record has been successfully created.'})
    @ApiBadRequestResponse({description: 'email address most be unique.'})
    @ApiBadRequestResponse({description: 'Data validation failed or Bad request..'})
    public async register(
        @Res() res: Response, 
        @Body() createUserDto: CreateAccountDto) {
            // const tCreateUserDto = new CreateAccountDto();
            // tCreateUserDto.email = createUserDto.email
            // tCreateUserDto.firstName = createUserDto.firstName
            // tCreateUserDto.lastName = createUserDto.lastName
            // tCreateUserDto.password = createUserDto.password
            // tCreateUserDto.passwordRepeat = createUserDto.passwordRepeat
            const controller = new CreateAccountFactory(this.connection, res);
        await new CreateAccountFacade(controller).exec(createUserDto);
    }

    @Post('auth/verify-email')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'User has been successfully verified.'})
    @ApiBadRequestResponse({description: 'Data validation failed or Bad request..'})
    async verifyEmail(
        @Res() res: Response, 
        @Request() req: ExpressRequest, 
        @Body() verifyUuidDto: VerifyUuidDto) {
        
            verifyUuidDto.inetLocation = new InetLocationDto(req);
        await new VerifyEmailAccountFacade(new VerifyEmailAccountFactory(this.connection, res))
            .exec(verifyUuidDto);
    }

    //@UseGuards(AuthGuard('local'))
    @UseGuards(LoginGuard)
    @Post('auth/login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'User has been successfully logged in and tokens generated.'})
    @ApiNotFoundResponse({description: 'Wrong email or password.'})
    @ApiConflictResponse({description: 'User blocked try later.'})
    @ApiBadRequestResponse({description: 'Data validation failed or Bad request.'})
    async login(
        @Res() res: Response, 
        @Request() req: ExpressRequest) {
        // console.log('accounts.controller::login::CP1::req.user');
        // console.dir(req.user);

        await new LoginAccountFacade(new LoginAccountFactory(this.connection, res))
          .exec(req.user as LoggedInUser, new InetLocationDto(req));

        // console.log('accounts.controller::login::CP2::req.user');
        // console.dir(req.user);

        // return user;
    }

    //@UseGuards(AuthGuard('jwt'))
    //@UseGuards(AuthenticatedGuard)
    @Get('me/profile')
    @UseGuards(RolesGuard)
    @Roles('admin')
    async getProfile(@Request() req: ExpressRequest) {
      console.log('AccountController::getProfile::CP1::req.user');
      console.dir(req.user);
      return await req.user;
    }

    @Post('auth/refresh-access-token')
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({description: 'Access token has been generated successfully.'})
    @ApiUnauthorizedResponse({description: 'User has been Logged out.'})
    @ApiBadRequestResponse({description: 'Data validation failed or Bad request.'})
    async refreshAccessToken(
        @Res() res: Response, 
        @Request() req: ExpressRequest, 
        @Body() refreshAccessTokenDto: RefreshAccessTokenDto) {
        
            refreshAccessTokenDto.inetLocation = new InetLocationDto(req);
            await new RefreshAccessTokenAccountFacade(new RefreshAccessTokenAccountFactory(this.connection, res))
                .exec(refreshAccessTokenDto);
    }

    @Post('auth/forgot-password')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'Verification has been sent.'})
    @ApiNotFoundResponse({description: 'Wrong email or password..'})
    @ApiBadRequestResponse({description: 'Data validation failed or Bad request.'})
    async forgotPassword(
        @Res() res: Response, 
        @Request() req: ExpressRequest, 
        @Body() createForgotPasswordDto: CreateForgotPasswordDto) {
            await new ForgotPasswordAccountFacade(new ForgotPasswordAccountFactory(this.connection, res))
                .exec(createForgotPasswordDto, new InetLocationDto(req));
    }

    @Post('auth/forgot-password-verify')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'Now user can reset his/her password.'})
    @ApiBadRequestResponse({description: 'Data validation failed or Bad request.'})
    async forgotPasswordVerify(
        @Res() res: Response, 
        @Request() req: ExpressRequest, 
        @Body() verifyUuidDto: VerifyUuidDto) {

        await new ForgotPasswordVerifyAccountFacade(new ForgotPasswordVerifyAccountFactory(this.connection, res))
            .exec(verifyUuidDto, new InetLocationDto(req));
    }

    @Post('auth/reset-password')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'Password has been successfully changed.'})
    @ApiBadRequestResponse({description: 'Data validation failed or Bad request.'})
    async resetPassword(
        @Res() res: Response, 
        @Body() resetPasswordDto: ResetPasswordDto) {
        // return await this.accountService.resetPassword(resetPasswordDto);

        await new ResetPasswordAccountFacade(new ResetPasswordAccountFactory(this.connection, res)).exec(resetPasswordDto);
    }
}
