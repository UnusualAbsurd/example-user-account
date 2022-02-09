import { Db, MongoClient } from "mongodb";

let cachedDB: Db;

export async function dbConnect() {
  if (cachedDB) return cachedDB;

  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = client.db(process.env.MONGODB_NAME);

  cachedDB = db;

  return db;
}
