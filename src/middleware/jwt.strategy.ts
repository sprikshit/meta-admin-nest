// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// // import { jwtConstants } from './constants'; // Your secret key

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: jwtConstants.secret,  // Use a secret key
//     });
//   }

//   async validate(payload: any) {
//     // Here, the payload is what was used to sign the token.
//     return { userId: payload.sub, username: payload.username };
//   }
// }
