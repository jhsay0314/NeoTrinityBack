
import { Board } from "src/boards/board.entity";
import { Group } from "src/group/group.entity";
import {BaseEntity,Column,PrimaryGeneratedColumn,Entity,Unique,OneToMany} from "typeorm";

@Entity()
@Unique(['email'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    email:string;

    @Column()
    username:string;

    @Column()
    password:string;

    @OneToMany(type => Board, board => board.user,{eager:true})
    boards : Board[];

    @OneToMany(type => Group , group => group.user, {eager:true})
    group : Group[];
}