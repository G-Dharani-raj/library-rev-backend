const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/User.model");
require("dotenv").config();

const userAuthenticate = async (req, res, next) => {
	let token = req.headers.authorization;
	if (!token) {
		res.send("Please login first");
	} else {
		try {
			let decoded = jwt.verify(token, process.env.JWT_SECRET);
			let email = decoded.email;
			let user = await UserModel.find({ email });
			if (user.length > 0) {
				req.headers.id = user[0].id;
				if (req.method === "POST") {
					next();
				} else if (req.method === "GET" && user[0].isAdmin) {
					next();
				} else {
					res.send("Invalid route");
				}
			} else {
				res.send("Invalid credentials. Please login again.");
			}
		} catch (error) {
			res.send(error);
		}
	}
};

module.exports = userAuthenticate;
