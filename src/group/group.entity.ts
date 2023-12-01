import { User } from "src/auth/user.entity";
import { BaseEntity , Column , PrimaryGeneratedColumn , Entity , ManyToOne , Unique} from "typeorm";
@Entity()
@Unique(['groupName'])
export class Group extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    groupName: string;

    @Column()
    groupDescription : string;

    @ManyToOne(type => User , user => user.group ,{eager:false})
    user:User;
}