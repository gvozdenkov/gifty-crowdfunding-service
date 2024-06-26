import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '#users/entities/user.entity';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async create(owner: User, createWishDto: CreateWishDto) {
    var newWish = this.wishRepository.create({ ...createWishDto, owner });

    return await this.wishRepository.save(newWish);
  }

  async findOne(query: FindOneOptions<Wish>) {
    var wish = await this.wishRepository.findOne(query);

    if (!wish) throw new NotFoundException(`Wish not found`);

    return wish;
  }

  async findMany(query: FindManyOptions<Wish>) {
    return (await this.wishRepository.find(query)) || [];
  }

  async update(id: string, updateWishDto: UpdateWishDto, userId: string) {
    var isOwner = await this.isOwner(id, userId);

    if (!isOwner) throw new ForbiddenException("You can't edit other people's wishes");

    var wish = await this.findOne({ where: { id } });

    var isHasOffers = wish.raised !== 0;

    var { link, price } = updateWishDto;

    if (isHasOffers && !!(link || price))
      throw new BadRequestException(
        "You cannot edit a wish 'link' and 'price' for which there are already offers",
      );

    return this.wishRepository.update(wish.id, {
      ...updateWishDto,
    });
  }

  async updateRaised(wishId: string, offerAmount: number) {
    var wish = await this.wishRepository.findOne({
      where: { id: wishId },
      relations: ['offers'],
    });

    if (wish.price === wish.raised)
      throw new ForbiddenException('Funds for this wish have already been raised');

    var remains = wish.price - wish.raised;

    if (offerAmount > remains)
      throw new ForbiddenException(
        'You cannot deposit more money than remains to be deposited for this wish',
      );

    return await this.wishRepository.update(wish.id, {
      raised: wish.raised + offerAmount,
    });
  }

  async updateCopied(wish: Wish) {
    return await this.wishRepository.update(wish.id, {
      copied: wish.copied + 1,
    });
  }

  async removeOne(id: string, userId: string) {
    var isOwner = await this.isOwner(id, userId);

    if (!isOwner) throw new ForbiddenException("You can't delete other people's wishes");

    var wish = await this.findOne({
      where: { id },
      relations: ['owner', 'offers', 'wishlists'],
    });

    return await this.wishRepository.remove(wish);
  }

  async copyWish(wishId: string, user: User) {
    var isOwner = await this.isOwner(wishId, user.id);

    if (isOwner) throw new ForbiddenException("You can't copy your own wishe");

    var wish = await this.findOne({ where: { id: wishId } });

    await this.updateCopied(wish);

    await this.create(user, {
      name: wish.name,
      link: wish.link,
      image: wish.image,
      price: wish.price,
      description: wish.description,
    });
  }

  // helpers
  async isOwner(wishId: string, userId: string) {
    var wish = await this.findOne({
      where: { id: wishId },
      select: { id: true },
      relations: ['owner'],
    });

    return wish.owner.id === userId;
  }
}
