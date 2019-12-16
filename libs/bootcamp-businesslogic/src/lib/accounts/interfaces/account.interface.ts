export interface IAccount {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    pw: string;
    pwSalt: string;
    jwtToken: string;
    refreshToken: string;
    roles: string[];
    verification: string;
    verified: boolean;
    verificationExpires: Date;
    loginAttempts?: number;
    blockExpires?: Date;
}
