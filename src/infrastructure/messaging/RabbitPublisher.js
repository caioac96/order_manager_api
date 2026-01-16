import amqp from 'amqplib';
import OrderEventPublisher from '../../domain/events/OrderEventPublisher.js';

export default class RabbitPublisher extends OrderEventPublisher {
  async connect() {
    this.connection = await amqp.connect(process.env.RABBITMQ_URL);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue('order-status');
  }

  async publishStatusChanged(order) {
    const message = JSON.stringify({
      orderId: order.id,
      status: order.status,
      timestamp: new Date()
    });

    this.channel.sendToQueue('order-status', Buffer.from(message));
  }
}
