import { MongoClient } from "mongodb";

let cached = null;

async function connect() {
  if (cached) return cached;
  const client = new MongoClient(process.env.MONGO_URL);
  await client.connect();
  cached = client;
  return client;
}

export default async function handler(req, res) {
  try {
    const client = await connect();
    const db = client.db("painelmobile");
    const pedidos = await db.collection("pedidos").find().toArray();
    res.status(200).json(pedidos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
