export class CreateUserDto{
    username:string;
    email:string;
    password:string;
}

export class verifyDto{
    email:string;
    otp:string;
}