import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CouponService } from '../services/coupon.service';
import { Coupon } from '../entities/coupon.entity';
import { CreateCouponInput } from '../dto/create-coupon.input';
import { UpdateCouponInput } from '../dto/update-coupon.input';

@Resolver(() => Coupon)
export class CouponResolver {
  constructor(private readonly couponService: CouponService) {}

  @Mutation(() => Coupon)
  createCoupon(
    @Args('createCouponInput') createCouponInput: CreateCouponInput,
  ) {
    return this.couponService.create(createCouponInput);
  }

  @Query(() => [Coupon])
  findAll() {
    return this.couponService.findAll();
  }

  @Query(() => Coupon)
  findOne(@Args('id') id: string) {
    return this.couponService.findOne(id);
  }

  @Mutation(() => Coupon)
  updateCoupon(
    @Args('updateCouponInput') updateCouponInput: UpdateCouponInput,
  ) {
    return this.couponService.update(updateCouponInput.id, updateCouponInput);
  }

  @Mutation(() => Coupon)
  removeCoupon(@Args('id') id: string) {
    return this.couponService.remove(id);
  }
}
