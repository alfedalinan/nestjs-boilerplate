import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../entities';
import { UserService } from './user/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]) // <-- add every new entities here
    ],
    providers: [UserService], // <--- add every new service here
    exports: [UserService] // <--- add every new service here
})
export class ServiceModule {}