// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { GqlArgumentsHost } from '@nestjs/graphql';
// import { verifyToken } from 'src/utils/token';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const ctx = GqlArgumentsHost.create(context).getContext();

//     let token;
//     if (!ctx.req.headers.authorization) {
//       throw new UnauthorizedException();
//     }
//     token = ctx.req.headers.authorization.split(' ')[1];

//     const decoded = await verifyToken(token);

//     if (!decoded) {
//       throw new UnauthorizedException();
//     }
//     ctx.req.user = decoded;
//     return true;
//   }
// }
