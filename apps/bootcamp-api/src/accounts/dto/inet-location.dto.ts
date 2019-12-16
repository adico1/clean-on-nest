import { Request as ExpressRequest } from 'express';
import { getClientIp } from 'request-ip';

export class InetLocationDto {
  private req: ExpressRequest = null;
  public ip: string;
  public country: string;
  public browser: string;
  
  constructor(req: ExpressRequest) {
    this.req = req;
    this.ip = this.getIp();
    this.browser = this.getBrowserInfo();
    this.country = this.getCountry();
  }

  private getIp(): string {
    return getClientIp(this.req);
  }

  private getBrowserInfo(): string {
    return this.req.header['user-agent'] || 'XX';
  }

  private getCountry(): string {
    return this.req.header['cf-ipcountry'] ? this.req.header['cf-ipcountry'] : 'XX';
  }
    
  
}