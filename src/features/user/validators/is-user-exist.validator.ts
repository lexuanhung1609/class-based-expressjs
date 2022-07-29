import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@ValidatorConstraint({ name: 'isUserExist', async: true })
export class IsUserExist implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: Repository<User>) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });

    return user === null || user === undefined;
  }

  defaultMessage(): string {
    return 'The email «$value» is already register.';
  }
}
