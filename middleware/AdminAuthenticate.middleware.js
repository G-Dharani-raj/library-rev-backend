const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/User.model");
require("dotenv").config();

const adminAuthenticate = async (req, res, next) => {
	const jwt_token = req.headers.authorization;
	if (
		req.method === "POST" ||
		req.method === "PATCH" ||
		req.method === "DELETE"
	) {
		try {
			if (!jwt_token) {
				res.send("Please login first").status(403);
			} else {
				let decoded = jwt.verify(jwt_token, process.env.JWT_SECRET);
				console.log(decoded, "middleware");
				let email = decoded.email;
				let user = await UserModel.find({ email });
				if (user[0].isAdmin) {
					next();
				} else {
					res.send("You are not authorized to access this");
				}
			}
		} catch (error) {
			res.send(error);
		}
	} else {
		next();
	}
};

module.exports = adminAuthenticate;
