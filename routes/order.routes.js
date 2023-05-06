const express = require("express");
const UserModel = require("../model/User.model");
const OrderModel = require("../model/Order.model");

const orderRouter = express.Router();

orderRouter.post("/", async (req, res) => {
	let userId = req.headers.id;
	console.log(req.path);

	try {
		let userData = await OrderModel.find({ user: userId });
		if (userData.length > 0) {
			await OrderModel.findByIdAndUpdate(userData[0].id, {
				books: [...userData[0].books, ...req.body.books],
				totalAmount: userData[0].books.length + req.body.books.length,
			});
			res.send("Order list has been updated");
		} else {
			let new_order = new OrderModel({
				user: userId,
				books: [...req.body.books],
				totalAmount: req.body.books.length,
			});
			await new_order.save();
			res.send("Order list has been updated");
		}
	} catch (error) {
		res.send(error);
	}
});

orderRouter.get("/", async (req, res) => {
	try {
		let data = await OrderModel.find();
		res.send(data);
	} catch (error) {
		res.send(error);
	}
});

module.exports = orderRouter;
