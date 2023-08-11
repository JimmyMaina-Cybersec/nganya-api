// import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { Permission } from './permission';
import { UserMetaDataType } from './UserMetaDataType';

// {
//   "user_roles": [
//     "onboarding manager",
//     "Super User"
//   ],
//     "user_metadata": { },
//   "iss": "https://nganya.us.auth0.com/",
//     "sub": "auth0|64d39b48a9c248f782449624",
//       "aud": [
//         "https://api.nganyaapp.com/",
//         "https://nganya.us.auth0.com/userinfo"
//       ],
//         "iat": 1691757466,
//           "exp": 1691843866,
//             "azp": "HtNAA7YS2Fjh3TfQFYX5RJrMOdG2itMv",
//               "scope": "openid profile email",
//                 "permissions": [
//                   "create:saccos",
//                   "read:saccos",
//                   "read:test-auth"
//                 ]
// }

export class OldJwtPayload {
  _id: string;
  sub: string;
  firstName: string;
  secondName: string;
  idNo: string;
  phone: string;
  email: string;
  photoURL: string;
  role:
    | 'Super User'
    | 'general admin'
    | 'admin'
    | 'station manager'
    | 'accountant'
    | 'station agent'
    | 'driver';
  sacco: Types.ObjectId | string;
  station?: string;
  vehicle?: string;
  permission?: Permission;
}
export class JwtPayload {
  user_metadata: UserMetaDataType;
  user_roles: string[];
  permissions: string[];
  sub: string;
}



