const express = require("express");
const BookModel = require("../model/Book.model");

const bookRouter = express.Router();

bookRouter.get("/", async (req, res) => {
	console.log(req.query);
	let { author, category } = req.query;
	let tmp = {};
	if (author && category) {
		tmp = {
			$and: [
				{
					author: {
						$regex: author,
						$options: "i",
					},
				},
				{
					category: {
						$regex: category,
						$options: "i",
					},
				},
			],
		};
	} else if (author) {
		tmp = { author: { $regex: author, $options: "i" } };
	} else if (category) {
		tmp = { category: { $regex: category, $options: "i" } };
	}
	console.log(tmp);
	try {
		let data = await BookModel.find(tmp);
		res.send(data).status(200);
	} catch (error) {
		res.send(error);
	}
});

bookRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		let book = await BookModel.findById(id);
		res.send(book).status(200);
	} catch (error) {
		res.send(error);
	}
});

bookRouter.post("/", async (req, res) => {
	try {
		let new_book = new BookModel({
			...req.body,
		});
		await new_book.save();
		res.send("Book has been added to database").status(201);
	} catch (error) {
		res.send(error);
	}
});

bookRouter.patch("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		await BookModel.findByIdAndUpdate(id, { ...req.body });
		res.send("Book has been updated").status(204);
	} catch (error) {
		res.send(error);
	}
});
bookRouter.delete("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		await BookModel.findByIdAndDelete(id);
		res.send("Book has been Deleted").status(202);
	} catch (error) {
		res.send(error);
	}
});

module.exports = bookRouter;
