/* eslint-disable import/no-cycle */
import { IsNumber, IsOptional, IsString, IsUrl, Length, Min } from 'class-validator';
import { Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import type { Relation } from 'typeorm';
import { AbstractEntity, ColumnNumericTransformer } from '#common';
import { User } from '#users/entities/user.entity';
import { Offer } from '#offer/entities/offer.entity';
import { Transform } from 'class-transformer';
import { Wishlist } from '#wishlist/entities/wishlist.entity';

@Entity()
export class Wish extends AbstractEntity {
  @Column('varchar', { length: 250 })
  @IsString()
  @Length(2, 250, { message: `'name' should have minium 2 and maximum 250 characters` })
  name: string;

  @Column('varchar', { length: 1024 })
  @IsString()
  @Length(2, 1024, { message: `'description' should have minium 2 and maximum 1024 characters` })
  description: string;

  @Column()
  @IsUrl({}, { message: `'link' should be a valid link` })
  link: string;

  @Column()
  @IsUrl({}, { message: `'image' should be a valid link` })
  image: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: `'price' should be a positive number` })
  @Min(0)
  @Transform((param) => Math.round(param.value * 100) / 100)
  price: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: `'raised' should be a positive number` })
  @Min(0)
  @Transform((param) => Math.round(param.value * 100) / 100)
  raised: number = 0;

  @Column({
    type: 'integer',
  })
  @IsOptional()
  @IsNumber({}, { message: `'copied' should be an integer number` })
  @Min(0)
  copied: number = 0;

  // Many Wishes belong to unique user
  @ManyToOne(() => User, (user) => user.wishes)
  owner: Relation<User>;

  // Many Offers for one Wish
  @OneToMany(() => Offer, (offer) => offer.wish, {
    onDelete: 'CASCADE',
  })
  offers: Offer[];

  @ManyToMany(() => Wishlist, (wishlist) => wishlist.wishes)
  @JoinTable()
  wishlists: Wishlist[];
}
