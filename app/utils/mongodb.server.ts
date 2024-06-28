import { MongoClient, ObjectId } from "mongodb";

let client: MongoClient;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
  }
  return client.db("yourDatabaseName");
}

export { connectToDatabase, ObjectId };
