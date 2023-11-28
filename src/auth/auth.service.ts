import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential-dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn-dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
        private jwtService : JwtService
    ){}

    async createUser(authCredentialsDto:AuthCredentialsDto) : Promise<void>{
        const {username,password,email} = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = this.userRepository.create({username,password:hashedPassword,email});

        try{
            await this.userRepository.save(user);
        }catch(error){
            if (error.code === '23505'){
                throw new ConflictException('Existing email');
            } else {
                throw new InternalServerErrorException();
            } 
        }
    }

    async signIn(signInDto:SignInDto) :Promise<{accessToken : String}>{
        const { email,password} = signInDto;
        const user = await this.userRepository.findOne({where:{email}});

        if(user && (await bcrypt.compare(password,user.password))){
            // 유저 토큰 생성(Secret + Payload)
            const payload = { email };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        }else{
            throw new UnauthorizedException('login failed');
        }
    }
}
