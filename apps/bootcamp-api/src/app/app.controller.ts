import { Controller, Request, Get, Post, UseGuards, Res } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
//import { AuthService } from '../auth/auth.service';

import * as path from 'path';
//import { InetLocationDto } from '../accounts/dto/inet-location.dto';
import { Response } from 'express';
require('dotenv').config({path: path.resolve(process.cwd(), 'apps/bootcamp-api/.env')});

@Controller()
export class AppController {
  constructor(
    //private readonly authService: AuthService
  ) {}

  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return req.user;
  //   //return this.authService.login(req.user, new InetLocationMapper(req).create());
  // }

  @Get('appinfo')
  getAppInfo(
    @Res() res: Response,
    @Request() req) {
      var pkg = require(path.join(__dirname, '/../../../../package.json'));
      res.json({
        name: pkg.name,
        version: pkg.version,
        status: 'up'
      });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}