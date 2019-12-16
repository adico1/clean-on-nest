import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req): {userId, email} => {
  return data ? req.user[data] : req.user;
});
