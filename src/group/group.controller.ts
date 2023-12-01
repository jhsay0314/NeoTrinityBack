import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/create-group-dto';
import { AuthGuard } from '@nestjs/passport'

@Controller('group')
@UseGuards(AuthGuard())
export class GroupController {
    constructor(private groupService:GroupService){}

    @Get()
    getAllGroup():Promise<Group[]>{
        return this.groupService.getAllGroup();
    }
    @Post()
    createGroup(@Body() createGroupDto:CreateGroupDto):Promise<Group>{
        return this.groupService.createGroup(createGroupDto);
    }
}
