import OrderRepository from '../../../../domain/repositories/OrderRepository.js';
import Order from '../../../../domain/entities/Order.js';
import OrderModel from '../models/OrderModel.js';

export default class OrderRepositoryMongo extends OrderRepository {
  async save(order) {
    const doc = await OrderModel.create(order);
    return new Order({
      id: doc._id.toString(),
      items: doc.items,
      status: doc.status,
      totalPrice: doc.totalPrice,
      totalQuantity: doc.totalQuantity,
      createdAt: doc.createdAt
    });
  }

  async findAll() {
    const docs = await OrderModel.find().lean();

    return docs.map(doc =>
      new Order({
        id: doc._id.toString(),
        ...doc
      })
    );
  }

  async findById(id) {
    const doc = await OrderModel.findById(id);
    return doc ?
      new Order({
        id: doc._id.toString(),
        items: doc.items,
        status: doc.status,
        totalPrice: doc.totalPrice,
        totalQuantity: doc.totalQuantity,
        createdAt: doc.createdAt
      }) :
      null;
  }

  async updateStatus(id, status) {
    await OrderModel.findByIdAndUpdate(id, { status });
  }
}