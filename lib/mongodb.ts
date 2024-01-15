import mongoose from 'mongoose';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalThat = global as any;

if (!globalThat.mongoose) {
  globalThat.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  const cached = globalThat.mongoose;

  if (cached.conn && cached.conn.readyState === 1) {
    // If connection is ready, just return it
    return cached.conn;
  }

  if (!cached.promise) {
    const { MONGODB_URI } = process.env;
    console.log('[:::Connecting to MongoDB...:::]');

    cached.promise = mongoose
      .connect(MONGODB_URI as string)
      .then((mongoose) => {
        console.log('[:::MONGO_DB_CONNECTED:::]');
        return mongoose;
      })
      .catch((err) => {
        console.error(':::[Database connection error:::]', err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
