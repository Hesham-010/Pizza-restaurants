import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderInput } from '../dto/create-order.input';
import { UpdateOrderInput } from '../dto/update-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { Order_Items } from '../entities/order_items.entity';
import { Pizza } from 'src/pizza/entities/pizza.entity';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { Addition } from 'src/addition/entities/addition.entity';
import { Order_Additions } from '../entities/order_additions.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Addition) private additionRepo: Repository<Addition>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Coupon) private couponRepo: Repository<Coupon>,
    @InjectRepository(Pizza) private pizzaRepo: Repository<Pizza>,
    @InjectRepository(Order_Items)
    private order_ItemsRepo: Repository<Order_Items>,
    @InjectRepository(Order_Additions)
    private order_AdditionsRepo: Repository<Order_Additions>,
  ) {}

  async createOrder(createOrderInput: CreateOrderInput) {
    // create new order
    const order = await this.orderRepo
      .createQueryBuilder()
      .insert()
      .into(Order)
      .values({
        ...createOrderInput,
        customer: { id: createOrderInput.customerId },
        store: { id: createOrderInput.storeId },
        staff: { id: createOrderInput.staffId },
        deliver: { id: createOrderInput.deliveryId },
      })
      .returning('*')
      .execute();

    // add order pizzas
    await this.orderPizzas(order, createOrderInput);

    // add order additions
    await this.orderAdditions(order, createOrderInput);

    //count total price and discount amount
    await this.totalPrice(order, createOrderInput.couponCode);

    return order;
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    const { city, street, orderStatus, recieveMethod } = updateOrderInput;
    if (city || street || orderStatus) {
      const updateOrder = await this.orderRepo
        .createQueryBuilder('order')
        .update(Order)
        .set({
          city,
          street,
          orderStatus,
          recieveMethod,
        })
        .where('id = :id', { id })
        .execute();
      if (!updateOrder.affected) {
        return new NotFoundException('No order for this id 5');
      }
    }

    const order = await this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.coupon', 'coupon')
      .where('order.id = :id', { id })
      .getOne();

    if (!order) {
      return new NotFoundException('No order for this id');
    }

    if (updateOrderInput.pizzas) {
      await this.order_ItemsRepo
        .createQueryBuilder()
        .delete()
        .from(Order_Items)
        .where('orderId = :id', { id })
        .execute();

      await this.orderPizzas(order, updateOrderInput);
    }

    if (updateOrderInput.additions) {
      await this.order_AdditionsRepo
        .createQueryBuilder()
        .delete()
        .from(Order_Additions)
        .where('orderId = :id', { id })
        .execute();

      await this.orderAdditions(order, updateOrderInput);
    }

    await this.totalPrice(order, false);

    return order;
  }

  async orderPizzas(order, data) {
    const pizzasIds = [];
    const pizzasQuantity = [];
    data.pizzas.map((item) => {
      pizzasIds.push(item.pizzaId);
      pizzasQuantity.push(item.quantity);
    });

    // get pizzas based on pizzasIds
    const pizzas = await this.pizzaRepo
      .createQueryBuilder('pizza')
      .select()
      .where('pizza.id IN (:...ids)', { ids: pizzasIds })
      .getMany();

    // create items on Order_Items entity
    const items = [];
    for (let i = 0; i < pizzas.length; i++) {
      items.push({
        order: order.id,
        pizza: pizzas[i].id,
        unitPrice: pizzas[i].price,
        quantity: pizzasQuantity[i],
      });
    }

    await this.order_ItemsRepo
      .createQueryBuilder()
      .insert()
      .into(Order_Items)
      .values(items)
      .execute();
  }

  async orderAdditions(order, data) {
    if (data.additions) {
      const addittionsIds = [];
      const addittionsQuantity = [];
      data.additions.map((item) => {
        addittionsIds.push(item.additionId);
        addittionsQuantity.push(item.quantity);
      });

      // get additions based on pizzasIds
      const additions = await this.additionRepo
        .createQueryBuilder('addition')
        .select()
        .where('addition.id IN (:...ids)', { ids: addittionsIds })
        .getMany();

      // create additions on Order_Additions entity
      const items = [];
      for (let i = 0; i < additions.length; i++) {
        if (additions[i].isGlobal) {
          items.push({
            order: order.id,
            addition: additions[i].id,
            unitPrice: additions[i].price,
            quantity: addittionsQuantity[i],
          });
        }
      }
      // create order additions in Order_Additions Entity
      await this.order_AdditionsRepo
        .createQueryBuilder()
        .insert()
        .into(Order_Additions)
        .values(items)
        .execute();
    }
  }

  async totalPrice(order, couponCode) {
    const { sumItem } = await this.order_ItemsRepo
      .createQueryBuilder('order_item')
      .select('SUM(order_item.unitPrice * order_item.quantity)', 'sumItem')
      .where('order_item.orderId = :id', { id: order.id })
      .getRawOne();

    const { sumAddition } = await this.order_AdditionsRepo
      .createQueryBuilder('order_addtion')
      .select(
        'SUM(order_addtion.unitPrice * order_addtion.quantity)',
        'sumAddition',
      )
      .where('order_addtion.orderId = :id', { id: order.id })
      .getRawOne();

    const sum = Number(sumItem) + Number(sumAddition);

    // get coupon based on coupon code
    let discountAmount = 0;
    let coupon;
    if (couponCode) {
      coupon = await this.couponRepo
        .createQueryBuilder('coupon')
        .select()
        .where('coupon.code = :code', { code: couponCode })
        .getOne();

      if (!coupon && coupon.expireDate.toString() > Date.now().toString()) {
        return new NotFoundException('Invalid Coupon Code');
      }
      order.coupon = { id: coupon.id } as any;
    } else if (order.coupon) {
      coupon = order.coupon;
    }

    discountAmount = (sum * coupon.discount) / 100;

    order.discountAmount = discountAmount;

    const totalPrice = sum - discountAmount;

    order.totalPrice = totalPrice;

    await this.orderRepo.save(order);
  }

  async findAll() {
    const orders = await this.orderRepo
      .createQueryBuilder()
      .select('order')
      .from(Order, 'order')
      .getMany();
    return orders;
  }

  async findOne(id: string) {
    const order = await this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.coupon', 'coupon')
      .leftJoinAndSelect('order.deliver', 'deliver')
      .leftJoinAndSelect('order.staff', 'staff')
      .leftJoinAndSelect('order.store', 'store')
      .leftJoinAndSelect('order.customer', 'customer')
      .where('order.id = :id', { id })
      .getOne();
    return order;
  }

  async remove(id: string) {
    await this.orderRepo
      .createQueryBuilder()
      .delete()
      .from(Order)
      .where('id = :id', { id })
      .execute();
    return 'Order Deleted';
  }
}
