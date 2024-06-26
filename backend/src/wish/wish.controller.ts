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
import { WishService } from './wish.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { WishOwnResponseDto } from './dto/wish-own-response.dto';
import { WishResponseDto } from './dto/wish-response.dto';
import { ResponseFeedDto } from './dto/response-feed.dto';
import { CreateWishResponseDto } from './dto/create-wish-response.dto';

@Controller({
  version: '1',
  path: 'wishes',
})
export class WishController {
  constructor(private readonly wishService: WishService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createWishDto: CreateWishDto, @Req() req: { user: User }) {
    var wish = await this.wishService.create(req.user, createWishDto);

    return plainToInstance(CreateWishResponseDto, wish);
  }

  @Get('last')
  async findLast() {
    var wishes = await this.wishService.findMany({
      relations: ['owner'],
      order: { createdAt: 'DESC' },
      take: 40,
    });

    return plainToInstance(ResponseFeedDto, wishes);
  }

  @Get('top')
  async findTop() {
    var wishes = await this.wishService.findMany({
      relations: ['owner'],
      order: { copied: 'DESC' },
      take: 20,
    });

    return plainToInstance(ResponseFeedDto, wishes);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() req: Request & { user: User },
  ) {
    var isOwner = await this.wishService.isOwner(id, req.user.id);

    var wish = await this.wishService.findOne({
      where: { id },
      relations: ['owner', 'offers.user'],
    });

    if (isOwner) {
      return plainToInstance(WishOwnResponseDto, wish);
    }

    return plainToInstance(WishResponseDto, wish);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateWishDto: UpdateWishDto,
    @Req() req: Request & { user: User },
  ) {
    var updatedWish = await this.wishService.update(id, updateWishDto, req.user.id);

    return plainToInstance(WishResponseDto, updatedWish);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() req: Request & { user: User },
  ) {
    var removedWish = await this.wishService.removeOne(id, req.user.id);

    return plainToInstance(WishResponseDto, removedWish);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/copy')
  async copyWish(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() req: Request & { user: User },
  ) {
    await this.wishService.copyWish(id, req.user);

    return {};
  }
}
