import { Module } from '@nestjs/common';
import { CouponService } from './services/coupon.service';
import { CouponResolver } from './resolvers/coupon.resolver';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon])],
  providers: [CouponResolver, CouponService],
})
export class CouponModule {}
