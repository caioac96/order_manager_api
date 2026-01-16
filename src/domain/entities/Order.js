export default class Order {
  constructor({ id, items, status = 'criado', createdAt = new Date() }) {
    // TODO: ajustar os itens de constructor
    this.id = id;
    this.items = items;
    this.status = status;
    this.createdAt = createdAt;
  }

  updateStatus(newStatus) {
    const allowed = ['criado', 'em processamento', 'enviado', 'entregue'];
    if (!allowed.includes(newStatus)) {
      throw new Error('Status inválido');
    }
    this.status = newStatus;
  }
}