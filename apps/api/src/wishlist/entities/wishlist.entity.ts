/* eslint-disable import/no-cycle */
import { IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { AbstractEntity } from '#common';
import { User } from '#users/entities/user.entity';
import { Wish } from '#wish/entities/wish.entity';

@Entity()
export class Wishlist extends AbstractEntity {
  @Column('varchar', { length: 250 })
  @IsString()
  @Length(2, 250, { message: `'name' should have minium 2 and maximum 64 characters` })
  name: string;

  @Column('varchar', { length: 1500, nullable: true })
  @IsString()
  @IsOptional()
  @Length(2, 1500, { message: `'description' should have minium 2 and maximum 1500 characters` })
  description: string;

  @Column()
  @IsOptional()
  @IsUrl({}, { message: `'cover' should be a valid link to the wishlist cover` })
  cover: string;

  // Wish located in many Wishlists, Each Wishlist contains many Wises
  @ManyToMany(() => Wish, (wish) => wish.wishlists, { onUpdate: 'CASCADE' })
  wishes: Wish[];

  // Many WishList can belong to unique user
  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
}
