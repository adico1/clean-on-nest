import { IView } from '../common/view.interface';
import { Response } from 'express';
import { HttpStatus, BadRequestException } from '@nestjs/common';
import { IViewModel } from '../..';
import { ValidationException } from '@btcp/bootcamp-blogic';

export class NestView implements IView {
  private _viewModel: IViewModel;
  get viewModel() {
    return this._viewModel;
  }
  set viewModel(viewModel: IViewModel) {
    this._viewModel = viewModel;
  }

  private _errorModel: string | Error;
  get errorModel() {
    return this._errorModel;
  }
  set errorModel(errorModel: string | Error) {
    this._errorModel = errorModel;
  }
  
  private _res: Response;

  constructor(res: Response) {
    this._res = res;
  }

  render() {
    let httpStatus = HttpStatus.OK;
    let content = this._viewModel;

    if (this.errorModel) {
      /* 
        At this point I first tried to use NEST exc eption handling:
        ``
        throw new BadRequestException(this.errorModel);
        ``
        but I got this object which felt like the message is repeating twice
        {
          "response": {
            "statusCode":400,
            "error":"Bad Request",
            "message":"error: first name invalid "
          },
          "status":400,
          "message":{
            "statusCode":400,
            "error":"Bad Request",
            "message":
            "error: first name invalid "
          }
        }

        Debugging lead me to the HttpException object where the constructor
        is duplicating the response into message:
        ``
        constructor(response, status) {
          super();
          this.response = response;
          this.status = status;
          this.message = response;
        }
        ``
        later the Response object output the stringify result of exception and
        we get that duplication.

        So i decided to skip Nest Exception Handling and do that myself
      */


      let errorResponse = null;
      if (typeof this._errorModel === 'string') {
        errorResponse = {
          statusCode:400,
          error:"Bad Request",
          message: this._errorModel
        };
      } else if (this._errorModel instanceof ValidationException) {
        errorResponse = {
          statusCode:400,
          error:"Bad Request",
          message: this._errorModel.message
        };
      } else if (this._errorModel instanceof BadRequestException ) {
        errorResponse = {
          statusCode:400,
          error:"Bad Request",
          message: this._errorModel.message
        };
      } else {
        console.log('NestView:render::this._errorModel');
        console.dir(this._errorModel);
      }

      return this._res.status(errorResponse.statusCode).json(errorResponse);  
    }

    if (!this._viewModel || !Object.keys([this._viewModel]).length) {
      httpStatus = HttpStatus.NO_CONTENT;
      content = null;
    }

    this._res.status(httpStatus).json(content);
  }
}