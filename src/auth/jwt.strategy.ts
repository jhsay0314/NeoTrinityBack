import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UnauthorizedException } from "@nestjs/common";
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>
    ){
        super({
            secretOrKey : process.env.JWT_SECRET || config.get('jwt.secret'),
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload){
        const { email }  = payload;
        const user : User = await this.userRepository.findOne({where:{email}});

        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}