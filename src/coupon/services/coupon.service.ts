import { Injectable } from '@nestjs/common';
import { CreateCouponInput } from '../dto/create-coupon.input';
import { UpdateCouponInput } from '../dto/update-coupon.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon) private couponRepo: Repository<Coupon>,
  ) {}

  async create(createCouponInput: CreateCouponInput) {
    const coupon = await this.couponRepo
      .createQueryBuilder()
      .insert()
      .into(Coupon)
      .returning('*')
      .values({ ...createCouponInput })
      .execute()
      .then((coupon) => coupon.raw[0] as Coupon);
    return coupon;
  }

  async findAll() {
    return `This action returns all coupon`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} coupon`;
  }

  async update(id: string, updateCouponInput: UpdateCouponInput) {
    return `This action updates a #${id} coupon`;
  }

  async remove(id: string) {
    return `This action removes a #${id} coupon`;
  }
}
