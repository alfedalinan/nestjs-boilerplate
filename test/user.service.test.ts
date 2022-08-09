import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../src/application/services/user/user.service';
import { User } from '../src/application/entities';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>
  let id: number

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([User]),
        AppModule
      ],
      providers: [
        UserService
      ]
    }).compile()

    service = module.get(UserService)
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
    await userRepository.clear()
  })

  afterAll(done => {
    done()
  })

  it('Create User', async () => {
    const user = await service.create({
      email: 'alfed@email.com',
      password: '1234',
      name: 'Alfed'
    })
    
    id = user.id

    expect(user).toBeTruthy()
    expect(user.hasOwnProperty('id')).toBe(true)
    expect(user.hasOwnProperty('name')).toBe(true)
    expect(user.hasOwnProperty('email')).toBe(true)
  })

  it('Get All User', async () => {
    const users = await service.findAll()
    expect(users.length).toBeGreaterThanOrEqual(1)
  })

  it('Find User By Id', async() => {
    const user = await service.findOne(id)

    expect(typeof user).toBe('object')
    expect(user.hasOwnProperty('id')).toBe(true)
    expect(user.hasOwnProperty('name')).toBe(true)
    expect(user.hasOwnProperty('email')).toBe(true)
  })

  it('Update User', async() => {
    const result = await service.update(id, {
      name: 'Alfed2',
      email: 'alfed2@email.com',
      password: '12345'
    })

    expect(result).toBeTruthy()
    expect(result.affected).toBeGreaterThanOrEqual(1)
  })

  it('Delete User', async () => {
    const result = await service.remove(id)

    expect(result).toBeTruthy()
    expect(result.affected).toBe(1)
  })
});
