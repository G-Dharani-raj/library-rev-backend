const { default: mongoose } = require("mongoose");

const connectDB = async () => {
	try {
		let connect = mongoose.connect(
			"mongodb+srv://gdharaniraj0:masai@cluster0.k998ffb.mongodb.net/"
		);
		console.log("Connected to the database");
	} catch (error) {
		console.log("Error connecting to the database" + error);
	}
};

module.exports = connectDB;
