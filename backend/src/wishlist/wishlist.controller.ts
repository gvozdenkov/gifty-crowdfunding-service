import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '#auth/guard/jwt-auth.guard';
import { User } from '#users/entities/user.entity';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistResponseDto } from './dto/wishlist-response.dto';

@Controller({
  version: '1',
  path: 'wishlists',
})
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createWishlistDto: CreateWishlistDto, @Req() req: Request & { user: User }) {
    var newWishlist = await this.wishlistService.create(createWishlistDto, req.user);

    return plainToInstance(WishlistResponseDto, newWishlist);
  }

  @Get()
  async findAll() {
    var wishlists = await this.wishlistService.findMany({
      relations: ['owner', 'wishes'],
    });

    return plainToInstance(WishlistResponseDto, wishlists);
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    var wishlist = await this.wishlistService.findOne({
      where: { id },
      relations: ['owner', 'wishes'],
    });

    return plainToInstance(WishlistResponseDto, wishlist);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @Req() req: Request & { user: User },
  ) {
    var updatedWishlist = await this.wishlistService.updateOne(id, updateWishlistDto, req.user.id);

    return plainToInstance(WishlistResponseDto, updatedWishlist);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() req: Request & { user: User },
  ) {
    var removedWishlist = await this.wishlistService.removeOne(id, req.user.id);

    return plainToInstance(WishlistResponseDto, removedWishlist);
  }
}
