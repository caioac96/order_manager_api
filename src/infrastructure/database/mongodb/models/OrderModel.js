import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        items: [
            {
                description: String,
                quantity: Number,
                unitPrice: { type: Number, set: v => Math.round(Number(v) * 100) / 100 }
            }
        ],
        totalPrice: { type: Number, set: v => Math.round(Number(v) * 100) / 100, required: true },
        totalQuantity: { type: Number, set: v => Math.round(Number(v) * 100) / 100, required: true },
        status: {
            type: String,
            enum: ['CREATED', 'PAID', 'SHIPPED', 'CANCELLED'],
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model('Order', OrderSchema);