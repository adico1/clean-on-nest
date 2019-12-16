export class Account {
  public id?: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public pw: string;
  public pwSalt: string;
  public jwtToken: string;
  public refreshToken: string;
  public roles: string[];
  public verification: string;
  public verified: boolean;
  public verificationExpires: Date;
  public loginAttempts?: number;
  public blockExpires?: Date;
}