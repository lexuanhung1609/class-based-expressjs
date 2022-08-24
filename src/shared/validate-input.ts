import { ClassConstructor, plainToClass } from 'class-transformer';
import { SignUp } from '../features/auth';
import { validate, ValidationError } from 'class-validator';

export const validateInput = async (className: ClassConstructor<any>, reqBody: unknown): Promise<ValidationError[]> => {
  const input = plainToClass(className, reqBody);
  return await validate(input);
};
