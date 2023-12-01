import { Injectable } from '@nestjs/common';
import { Group } from './group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group-dto';
import { User } from 'src/auth/user.entity';
@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private groupRepository : Repository<Group>,
        
    ){}

    async getAllGroup() : Promise<Group[]>{
        return this.groupRepository.find();
    }
    async createGroup(createGroupDto:CreateGroupDto) : Promise<Group>{
        const {groupName,groupDescription} = createGroupDto;

        const group = this.groupRepository.create({
            groupName,
            groupDescription
        })

        await this.groupRepository.save(group);
        return group;
    }

}
