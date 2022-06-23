import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find({ relations: ['userGrade'] });
  }

  async findAllWithDeleted() {
    return await this.userRepository.find({
      withDeleted: true,
      relations: ['userGrade'],
    });
  }

  async findOne({ userId }) {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ['userGrade'],
    });
  }

  async findOneByEmail({ email, provider }) {
    return await this.userRepository.findOne({
      where: {
        email: email,
        provider: provider,
      },
      relations: ['userGrade'],
    });
  }

  async create({ createUserInput }) {
    const { userGradeId, ...user } = createUserInput;

    const userInfo = await this.userRepository.findOne({
      where: { email: user.email, provider: user.provider },
    });

    if (userInfo) throw new ConflictException('이미 등록된 이메일입니다.');

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const saveInput = {
      ...user,
      password: hashedPassword,
    };

    if (userGradeId) {
      saveInput.userGrade = { id: userGradeId };
    }

    return await this.userRepository.save(saveInput);
  }

  async update({ userId, updateUserInput }) {
    const { userGradeId } = updateUserInput;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const newUser = {
      ...user,
      ...updateUserInput,
    };

    if (updateUserInput.password) {
      const hashedPassword = await bcrypt.hash(updateUserInput.password, 10);
      newUser.password = hashedPassword;
    }

    if (userGradeId) {
      newUser.userGrade = { id: userGradeId };
    }

    return await this.userRepository.save(newUser);
  }

  async checkExist({ userId }) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new UnprocessableEntityException('없는 회원입니다.');
  }

  async delete({ userId }) {
    const result = await this.userRepository.softDelete({ id: userId });
    return result.affected ? true : false;
  }

  async restore({ userId }) {
    const result = await this.userRepository.restore({ id: userId });
    return result.affected ? true : false;
  }

  async updatePassword({ userId, updatePassword }) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const hashedPassword = await bcrypt.hash(updatePassword, 10);

    const newUser = {
      ...user,
      password: hashedPassword,
    };

    return await this.userRepository.save(newUser);
  }
}
