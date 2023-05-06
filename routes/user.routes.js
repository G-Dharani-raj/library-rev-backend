const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserModel = require("../model/User.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
	let { name, email, password } = req.body;
	try {
		let user = await UserModel.find({ email });
		if (user.length > 0) {
			res.send("User already exists");
		} else {
			bcrypt.hash(password, 5, async (err, hash) => {
				if (err) res.send(err);
				else {
					let new_user = new UserModel({
						...req.body,
						password: hash,
					});
					await new_user.save();
					res.send("User registered successfully").status(201);
				}
			});
		}
	} catch (error) {
		res.send(error);
	}
});

userRouter.post("/login", async (req, res) => {
	let { email, password } = req.body;
	try {
		let user = await UserModel.find({ email });
		if (user.length > 0) {
			let store_pass = user[0].password;
			bcrypt.compare(password, store_pass, (err, result) => {
				if (err) res.send(err);
				else if (result) {
					let token = jwt.sign({ email }, process.env.JWT_SECRET);
					res.header("Authorization", token);
					res.send("Token: " + token).status(201);
				} else {
					res.send("Wrong password");
				}
			});
		} else {
			res.send("User does not exist");
		}
	} catch (error) {
		res.send(error);
	}
});

module.exports = userRouter;
