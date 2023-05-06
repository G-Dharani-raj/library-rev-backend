const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
	user: { type: mongoose.Schema.ObjectId, ref: "User" },
	books: [{ type: mongoose.Schema.ObjectId, ref: "Book" }],
	totalAmount: Number,
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
