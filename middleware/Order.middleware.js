const express = require("express");
require("dotenv").config();

const orderMiddleware = async (req, res, next) => {
	let token = req.headers.authorization;
};
