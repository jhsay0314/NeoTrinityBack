import { Injectable } from '@nestjs/common';
import { VoteDto } from './dto/vote-dto';

@Injectable()
export class VoteService {
    vote(voteDto : VoteDto){
        return voteDto;
    }
}
