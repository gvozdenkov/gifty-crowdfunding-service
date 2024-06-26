/* eslint-disable import/no-cycle */
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, IsUrl, Length, Matches, MinLength } from 'class-validator';
import { Entity, Column, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { Wishlist } from '#wishlist/entities/wishlist.entity';
import { AbstractEntity } from '#common';
import { Wish } from '#wish/entities/wish.entity';
import { Offer } from '#offer/entities/offer.entity';

@Entity()
export class User extends AbstractEntity {
  @Column('varchar', { length: 64, unique: true })
  @IsString()
  @Length(2, 64, { message: `'username' should have minium 2 and maximum 64 characters` })
  @Matches(/^[A-Za-z0-9-]+$/, {
    message: `'username' must consist only of Latin characters, numbers and hyphens ( without spaces)`,
  })
  username: string;

  @Column('varchar', { length: 200, nullable: true })
  @IsOptional()
  @IsString()
  @Length(0, 200, { message: `'about' should have maximum 200 characters` })
  about: string;

  @Column()
  @IsOptional()
  @IsUrl({}, { message: `'avatar' should be a valid link to the image` })
  avatar: string;

  @Column({ unique: true })
  @IsEmail({}, { message: `'email' should be a valid email` })
  @Transform((param) => param.value.toLowerCase())
  email: string;

  @Column('varchar', { length: 64 })
  @MinLength(4, { message: `'password' shoud be minimum 4 charecters` })
  password: string;

  // Many Wishes belong to unique user
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Relation<Wish[]>;

  // Many Wishlists belong to unique user
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Relation<Wishlist[]>;

  // Many Offers belong to unique user
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Relation<Offer[]>;
}
