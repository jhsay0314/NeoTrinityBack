import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AuthModule } from './auth/auth.module';
import { VoteModule } from './vote/vote.module';

@Module({
  imports:[
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule,
    VoteModule,
  ],
})
export class AppModule {}
