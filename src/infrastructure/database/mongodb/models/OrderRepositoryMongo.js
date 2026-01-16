import OrderRepository from '../../../domain/repositories/OrderRepository.js';
import Order from '../../../../domain/entities/Order.js';
import OrderModel from '../models/OrderModel.js';

export default class OrderRepositoryMongo extends OrderRepository {
  async save(order) {
    const doc = await OrderModel.create(order);
    return new Order(doc.toObject());
  }

  async findById(id) {
    const doc = await OrderModel.findById(id);
    return doc ? new Order(doc.toObject()) : null;
  }

  async updateStatus(id, status) {
    await OrderModel.findByIdAndUpdate(id, { status });
  }
}