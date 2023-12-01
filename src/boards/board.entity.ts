import { BaseEntity , Column , PrimaryGeneratedColumn , Entity , ManyToOne , CreateDateColumn} from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { User } from "src/auth/user.entity";

@Entity()
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    status:BoardStatus;

    @CreateDateColumn()
    createdAt : Date;
    
    @ManyToOne(type => User,user=>user.boards,{eager : false})
    user:User;
}