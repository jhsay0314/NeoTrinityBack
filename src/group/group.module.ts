import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Group } from './group.entity';
import { TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Group]),
    AuthModule
],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
