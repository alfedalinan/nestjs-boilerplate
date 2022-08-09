import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../entities'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async create(user: User) {
        return await this.userRepository.save(user)
    }

    async findAll() {
        return await this.userRepository.find()
    }

    async findOne(id: number) {
        return await this.userRepository.findOneBy({ id })
    }

    async update(id: number, user: User) {
        return await this.userRepository.update(id, user)
    }

    async remove(id: number) {
        return await this.userRepository.delete(id)
    }
}
