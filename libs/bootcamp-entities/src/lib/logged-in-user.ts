import { Account } from '@btcp/bootcamp-entities';

export class LoggedInUser { 
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  roles: string[];
  sub: string;

  public static userToLoggedInUser(user: Partial<Account>) {
    return{ 
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.email,
      roles: user.roles,
      sub: user.id
    } as LoggedInUser
  }
}
