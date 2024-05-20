import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.session.userId;
    if (!user) {
      throw new UnauthorizedException('No access to this page pls login first');
    }
    return user;
  }
}
