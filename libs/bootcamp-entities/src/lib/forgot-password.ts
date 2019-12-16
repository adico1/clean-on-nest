export class ForgotPassword {
    public id?: string;
    public email: string;
    public verification: string;
    public firstUsed: boolean;
    public finalUsed: boolean;
    public expires: Date;
    public ip: string;
    public browser: string;
    public country: string;
    public ipChanged: string;
    public browserChanged: string;
    public countryChanged: string;
}
