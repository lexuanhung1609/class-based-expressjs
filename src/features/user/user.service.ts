import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SignUp } from '../auth';

export class UserService {
  constructor(private userRepository: Repository<User>) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[] | undefined> {
    return this.userRepository.find();
  }

  async createUser(data: SignUp): Promise<User> {
    const user = this.userRepository.create(data);

    return this.userRepository.save(user);
  }

  async updateUser(id: number, attrs: Partial<User>) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('user not found');
    }
    Object.assign(user, attrs);
    return this.userRepository.save(user);
  }
}
