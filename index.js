const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const bookRouter = require("./routes/books.routes");
const adminAuthenticate = require("./middleware/AdminAuthenticate.middleware");
const orderRouter = require("./routes/order.routes");
const userAuthenticate = require("./middleware/UserAuthenticate.middleware");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/books", adminAuthenticate);
app.use("/api/order", userAuthenticate);
app.use("/api/orders", userAuthenticate);

app.get("/", (req, res) => {
	res.send("Homepage");
});
app.use("/api", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/order", orderRouter);
app.use("/api/orders", orderRouter);
app.listen(process.env.PORT, () => {
	connectDB();
	console.log("Server listening on port " + process.env.PORT);
});
