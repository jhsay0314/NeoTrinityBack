import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential-dto';
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){

    }
    @Post('/signup')
    signUp(@Body(ValidationPipe) authcredentialsDto:AuthCredentialsDto):Promise<void>{
        return this.authService.createUser(authcredentialsDto);
    }
    @Post('/signin')
    signIn(@Body(ValidationPipe) authCrentialsDto :AuthCredentialsDto): Promise<{accessToken:String}>{
        return this.authService.signIn(authCrentialsDto);
    }
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user:User){
        console.log('user',user);
    }
}
