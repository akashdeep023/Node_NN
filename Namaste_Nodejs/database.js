// mongodb://localhost:27017

const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const dbName = "namaste_node";

async function main() {
	await client.connect();
	console.log("Connected successfully to server");
	const db = client.db(dbName);
	const collection = db.collection("users");

	const data = {
		firstname: "Akash",
		lastname: "Deep",
		city: "Bihar",
		phoneNumber: "987543210",
	};

	// const insertResult = await collection.insertOne(data);
	// console.log("Inserted documents =>", insertResult);

	// Read
	const findResult = await collection.find({}).toArray();
	console.log("Found documents =>", findResult);

	const countResult = await collection.countDocuments({});
	console.log("Count of documents in the User collection =>", countResult);

	// Find all documents with a filter of firstname: Deepika

	const result = await collection.find({ firstname: "Akash" }).toArray();

	console.log("result => ", result);

	return "done.";
}

main()
	.then(console.log)
	.catch(console.error)
	.finally(() => client.close());
