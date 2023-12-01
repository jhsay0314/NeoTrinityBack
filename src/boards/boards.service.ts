import { Injectable , NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private boardRepository:Repository<Board>,
    ){}
    async getAllBoards():Promise<Board[]>{
        return this.boardRepository
        .createQueryBuilder("board")
        .leftJoinAndSelect("board.user", "user")
        .select(["board", "user.username"])
        .getMany();
    }

        async createBoard(createBoardDto:CreateBoardDto,user:User) :Promise<Board>{
            const {title,description} = createBoardDto;
 
            const board = this.boardRepository.create({
                title,
                description,
                status : BoardStatus.PUBLIC,
                user
            })

            await this.boardRepository.save(board);
            return board;
        }

        async getBoardById(id:number) : Promise <Board>{
            const found = await this.boardRepository.findOne({where:{id}});

            if (!found){
                throw new NotFoundException(`can't find board with id{id}`);
            }
            return found;
        }
        async deleteBoard(id:number,user:User):Promise<void>{
            const result = await this.boardRepository.delete({id,user:{
                id:user.id
            }});

            if(result.affected ===0){
                throw new NotFoundException(`Can't find Board with id ${id}`);
            }
        }   
     // deleteBoard(id:string) : void{
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }
    
    async updateBoardStatus(id:number,status:BoardStatus):Promise<Board>{
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
}
