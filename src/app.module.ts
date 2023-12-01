import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AuthModule } from './auth/auth.module';
import { VoteModule } from './vote/vote.module';
import { GroupModule } from './group/group.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports:[
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule,
    VoteModule,
    GroupModule,
    ReservationModule,
  ],
})
export class AppModule {}
