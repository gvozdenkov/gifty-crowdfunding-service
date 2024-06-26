import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { HelperService } from '#helper/helper.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly helperService: HelperService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    var { email, username, password, avatar, about } = createUserDto;

    var user = await this.userRepository.findOneBy([{ username }, { email }]);

    if (user) {
      var isUserNameEsists = user.username === username;

      if (isUserNameEsists)
        throw new ConflictException(`user with '${username}' username already exists`);

      var isEmailExists = user.email === email;

      if (isEmailExists) throw new ConflictException(`user with '${email}' email already exists`);
    }

    var hashedPassword = await this.helperService.hash(password);

    var userAvatar =
      avatar || `https://i.pravatar.cc/200/?img=${Math.floor(Math.random() * 70) + 1}`;

    var userAbout = about || "Haven't said anything about myself yet";

    return await this.userRepository.save({
      ...createUserDto,
      password: hashedPassword,
      avatar: userAvatar,
      about: userAbout,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    var user = await this.findOne({ where: { id } });

    var { username, about, avatar, email, password } = updateUserDto;

    var hashedPassword = password && (await this.helperService.hash(password));

    var isUsernameEsists = username && (await this.userRepository.findOneBy({ username }));

    var isEmailEsists = email && (await this.userRepository.findOneBy({ email }));

    if (isUsernameEsists)
      throw new ConflictException(`User with '${username}' username already exists`);

    if (isEmailEsists) throw new ConflictException(`User with '${email}' email already exists`);

    return this.userRepository.save({
      ...user,
      ...updateUserDto,
      password: hashedPassword || user.password,
      avatar: avatar || user.avatar,
      about: about || user.about,
    });
  }

  async findOne(query: FindOneOptions<User>) {
    var user = await this.userRepository.findOne(query);

    if (!user) throw new NotFoundException(`User not found`);

    return user;
  }

  async findMany(query: FindManyOptions<User>) {
    var users = await this.userRepository.find(query);

    return users || [];
  }
}
