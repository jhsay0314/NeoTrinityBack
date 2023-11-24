import { Injectable , NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private boardRepository:Repository<Board>,
    ){}
    async getAllBoards():Promise<Board[]>{
        return this.boardRepository.find();
    }

    // createBoard(createBoardDto:CreateBoardDto){
    //     const {title,description} = createBoardDto;

    //     const board: Board = {
    //         id : uuid(),
    //         title,
    //         description,
    //         status : BoardStatus.PUBLIC
    //     }
    //     this.boards.push(board);
    //     return board;
    // }
        async createBoard(createBoardDto:CreateBoardDto) :Promise<Board>{
            const {title,description} = createBoardDto;
 
            const board = this.boardRepository.create({
                title,
                description,
                status : BoardStatus.PUBLIC
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
        async deleteBoard(id:number):Promise<void>{
            const result = await this.boardRepository.delete(id);

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
