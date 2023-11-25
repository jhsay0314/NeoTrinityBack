import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type : 'postgres',
    host : 'localhost',
    port : 5432,
    username : 'jiho',
    password : '1234',
    database : 'neo',
    entities : [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize : true
}
