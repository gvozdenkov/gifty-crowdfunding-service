import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';
import { WishService } from '#wish/wish.service';
import { User } from '#users/entities/user.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishListRepository: Repository<Wishlist>,
    private readonly wishService: WishService,
  ) {}

  async create(createWishlistDto: CreateWishlistDto, owner: User) {
    var { name: dtoName, cover: dtoCover, wishIds } = createWishlistDto;

    var cover = dtoCover || `https://placehold.jp/b0b0b0/ffffff/200x200.png?text=New%20Wishlist`;

    var name = dtoName || 'New Wishlist';

    var wishes =
      wishIds?.length &&
      (await this.wishService.findMany({
        where: { id: In(wishIds) },
      }));

    var newWishlist = this.wishListRepository.create({
      ...createWishlistDto,
      cover,
      name,
      owner,
      wishes: wishes || [],
    });

    return await this.wishListRepository.save(newWishlist);
  }

  async findOne(query: FindOneOptions<Wishlist>) {
    var wishlist = await this.wishListRepository.findOne(query);

    if (!wishlist) throw new NotFoundException(`Wishlist not found`);

    return wishlist;
  }

  async findMany(query: FindManyOptions<Wishlist>) {
    return (await this.wishListRepository.find(query)) || [];
  }

  async updateOne(id: string, updateWishlistDto: UpdateWishlistDto, userId: string) {
    var isOwner = await this.isOwner(id, userId);

    if (!isOwner) throw new ForbiddenException("You can't edit other people's wishlists");

    var { name, description, cover, wishIds } = updateWishlistDto;

    var wishlist = await this.findOne({
      where: { id },
      relations: ['wishes', 'owner'],
    });

    var wishes =
      wishIds?.length &&
      (await this.wishService.findMany({
        where: { id: In(wishIds) },
      }));

    return await this.wishListRepository.save({
      ...wishlist,
      name: name || wishlist.name,
      description: description || wishlist.description,
      cover: cover || wishlist.cover,
      wishes: wishes || wishlist.wishes,
    });
  }

  async removeOne(id: string, ownerId: string) {
    var isOwner = await this.isOwner(id, ownerId);

    if (!isOwner) throw new ForbiddenException("You can't delete other people's wishlists");

    var wishlist = await this.findOne({
      where: { id },
      relations: ['owner', 'wishes'],
    });

    return await this.wishListRepository.remove(wishlist);
  }

  // helpers
  async isOwner(wishlistId: string, userId: string) {
    var wishlist = await this.findOne({
      where: { id: wishlistId },
      select: { id: true },
      relations: ['owner'],
    });

    return wishlist.owner.id === userId;
  }
}
