import { AuthCredentialsDto } from "./auth-credential-dto";
import { PartialType } from "@nestjs/mapped-types/dist";
import { IsString, MaxLength, MinLength , Matches} from "class-validator"; 

export class SignInDto extends PartialType(AuthCredentialsDto){
    @IsString()
    email:string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username?:string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    // 영어 숫자만 가능
    @Matches(/^[a-zA-Z0-9]*$/,{
        message:'password only accepts number and english'
    })
    password?:string;
}