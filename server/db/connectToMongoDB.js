import mongoose from "mongoose";

// console.log(process.env.MONGO_DB_URI)

const connectToMongoDB = async () => {
	try {
		// console.log("trying to connect, shit: ", process.env.MONGO_DB_URI)
		await mongoose.connect(process.env.MONGO_DB_URI);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;
