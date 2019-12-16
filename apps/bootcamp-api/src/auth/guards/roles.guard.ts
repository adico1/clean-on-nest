// see: https://stackoverflow.com/questions/53426069/getting-user-data-by-using-guards-roles-jwt

import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info: Error, context: ExecutionContext) {
    // console.log('RolesGuard::handleRequest::CP1::user:', user);
    if (err) {throw err;}
    // if (info) {console.log(info);}
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // console.log('roles');
    // console.dir(roles);
    if (!roles) {
      return true;
    }
    const hasRole = () => user.roles.some((role) => roles.includes(role));
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!(user.roles && hasRole())) {
      throw new ForbiddenException('Forbidden');
    }

    if (user && user.roles && hasRole()) {
      return user;
    }

    throw new ForbiddenException('Forbidden');
  }
}
