import { Controller, Post ,Body} from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteDto } from './dto/vote-dto';

@Controller('vote')
export class VoteController {
    constructor (private voteService : VoteService){}
    
    @Post()
    vote(@Body() voteDto:VoteDto){
        return this.voteService.vote(voteDto);
    }
}
