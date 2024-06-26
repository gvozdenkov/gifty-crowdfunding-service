/* eslint-disable import/no-cycle */
import { Column, Entity, ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { AbstractEntity, ColumnNumericTransformer } from '#common';
import { User } from '#users/entities/user.entity';
import { Wish } from '#wish/entities/wish.entity';

@Entity()
export class Offer extends AbstractEntity {
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: `'amount' should be a positive number` })
  @Transform((param) => Math.round(param.value * 100) / 100)
  amount: number;

  @Column()
  @IsOptional()
  @IsBoolean({ message: `'hidden' should be a boolean value` })
  hidden: boolean = false;

  // Many Offers belong to unique user
  @ManyToOne(() => User, (user) => user.offers)
  user: Relation<User>;

  // Many Offers belong to unique Wish
  @ManyToOne(() => Wish, (wish) => wish.offers)
  wish: Relation<Wish>;
}
