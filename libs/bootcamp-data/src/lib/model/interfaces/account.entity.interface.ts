import { IIdEntity } from './id.entity.interface';

export interface IAccountEntity extends IIdEntity {
  firstName: string;
  lastName: string;
  email: string;
  pw: string;
  pwSalt: string;
  jwtToken: string;
  refreshToken: string;
  verified: boolean;
  roles: string[];
  verification: string;
  verificationExpires: Date;
  loginAttempts: number;
  blockExpires: Date;
}