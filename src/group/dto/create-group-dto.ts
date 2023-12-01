import { IsString, MaxLength, MinLength , Matches , IsNotEmpty} from "class-validator"; 
export class CreateGroupDto{
    @IsString()
    @IsNotEmpty()
    groupName : string;

    @IsString()
    @IsNotEmpty()
    groupDescription : string;

}