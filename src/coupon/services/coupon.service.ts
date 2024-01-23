import { Injectable, NotFoundException } from '@nestjs/common';
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
    const coupons = await this.couponRepo.find();
    return coupons;
  }

  async findOne(id: string) {
    const coupon = await this.couponRepo.findOne({ where: { id } });
    if (!coupon) {
      return new NotFoundException(`There is no coupon for this id ${id}`);
    }
    return coupon;
  }

  async update(id: string, updateCouponInput: UpdateCouponInput) {
    const coupon = await this.couponRepo.findOne({ where: { id } });
    if (!coupon) {
      return new NotFoundException(`There is no coupon for this id ${id}`);
    }

    coupon.discount = updateCouponInput.discount;
    coupon.expireDate = updateCouponInput.expireDate;
    await this.couponRepo.save(coupon);

    return coupon;
  }

  async remove(id: string) {
    const coupon = await this.couponRepo.findOne({ where: { id } });
    if (!coupon) {
      return new NotFoundException(`There is no coupon for this id ${id}`);
    }
    await this.couponRepo.delete(coupon);
    return 'Coupon Deleted';
  }
}
