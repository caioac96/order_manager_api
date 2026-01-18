import amqp from 'amqplib';
import OrderEventPublisher from '../../domain/events/OrderEventPublisher.js';

export default class RabbitPublisher extends OrderEventPublisher {
  async connect(url) {
    this.connection = await amqp.connect(url);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue('orders');
  }

  async orderCreated(order) {
    if (!this.channel) {
      throw new Error('RabbitPublisher not connected. Call connect() first.');
    }
    const message = JSON.stringify({
      event: 'OrderCreated',
      orderId: order.id,
      status: order.status,
      timestamp: new Date()
    });

    this.channel.sendToQueue('orders', Buffer.from(message));
  }

  async orderStatusUpdated(order) {
    if (!this.channel) {
      throw new Error('RabbitPublisher not connected. Call connect() first.');
    }
    const message = JSON.stringify({
      event: 'OrderStatusUpdated',
      orderId: order.id,
      status: order.status,
      timestamp: new Date()
    });

    this.channel.sendToQueue('orders', Buffer.from(message));
  }
}