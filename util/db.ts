import { MongoClient } from 'mongodb';

export async function connectToDB() {
  const client = await MongoClient.connect(
    'mongodb+srv://akshat:akshat123@fooddelivery.xcarl62.mongodb.net/food-delivery?retryWrites=true&w=majority'
  );
  return client;
}

export function getCollection(client: MongoClient, collection: string) {
  return client.db().collection(collection);
}
