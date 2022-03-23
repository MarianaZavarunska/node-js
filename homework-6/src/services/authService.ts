// import { IUser } from '../entity/user';
// import { tokenService } from './tokenService';
//
// class AuthService {
//     // public async registration(body: IUser) {
//     //     const { email } = body;
//     //     const userFromDB = await userService.getUserByEmail(email);
//     //     if (userFromDB) {
//     //         throw new Error(`User with:  ${email} email already exists`);
//     //     }
//     //     const createdUser = await userService.createUser(body);
//     //     return this._getTokenData(createdUser);
//     // }
//
// //     private async _getTokenData(data:IUser) {
// //         const { id, email } = data;
//       const tokenPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
// //
// //         await tokenService.saveToken(id, tokenPair.refreshToken, tokenPair.accessToken);
// //
// //         return {
// //             ...tokenPair,
// //             userId: id,
// //             userEmail: email,
// //         };
// //     }
// // }
//
// export const authService = new AuthService();
