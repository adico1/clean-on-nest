export class Consts {
  public static HOURS_TO_VERIFY = 4;
  public static MIN_PASSWORD_LENGTH = 8;
  public static NAME_MIN_LENGTH = 2;
  public static FIRST_NAME_MIN_LENGTH = Consts.NAME_MIN_LENGTH;
  public static LAST_NAME_MIN_LENGTH = Consts.NAME_MIN_LENGTH;
  public static MIN_BROWSER_LENGTH = 2;
  public static MIN_COUNTRY_LENGTH = 2;
  public static HOURS_TO_BLOCK = 6;
  public static LOGIN_ATTEMPTS_TO_BLOCK = 5;
  public static HttpStatus = {
    code: {
      OK: 200,
      NO_CONTENT: 204,
      UNAUTHORIZED: 401,
      CONFLICT: 409,
      BAD_REQUEST: 400,
      FORBIDDEN: 403
    },
    message: {
      UNAUTHORIZED: 'Unauthorized',
      CONFLICT: 'Conflict',
      BAD_REQUEST: 'Bad Request',
      FORBIDDEN: 'Forbidden'
    }
  };
  public static Http = {
    UNAUTHORIZED: { 
      statusCode: Consts.HttpStatus.code.UNAUTHORIZED, 
      error: Consts.HttpStatus.message.UNAUTHORIZED 
    },
    FORBIDDENpMSG: { 
      statusCode: Consts.HttpStatus.code.FORBIDDEN, 
      error: Consts.HttpStatus.message.FORBIDDEN, 
      message: Consts.HttpStatus.message.FORBIDDEN  
    }
  };
  
}