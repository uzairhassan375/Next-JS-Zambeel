import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please set MONGODB_URI in .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 8000,
      })
      .then((mongooseInstance) => mongooseInstance)
      .catch((error) => {
        // Clear so the next request can retry instead of reusing a rejected promise
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    throw error;
  }
}

function isTransientMongoError(error) {
  const name = String(error?.name || '');
  const message = String(error?.message || '').toLowerCase();
  const transientNames = [
    'MongoServerSelectionError',
    'MongoStalePrimaryError',
    'MongoNetworkError',
    'MongoTopologyClosedError',
    'MongoNotConnectedError',
    'MongoExpiredSessionError',
  ];

  if (transientNames.includes(name)) return true;

  return (
    message.includes('stale') ||
    message.includes('primary') ||
    message.includes('topology') ||
    message.includes('server selection') ||
    message.includes('connection') ||
    message.includes('not connected') ||
    message.includes('econnrefused') ||
    message.includes('econnreset')
  );
}

function resetCachedConnection() {
  cached.conn = null;
  cached.promise = null;
}

/**
 * Run a DB query with one automatic reconnect+retry on transient
 * connection/topology failures (e.g. Atlas replica set election).
 */
export async function withDB(queryFn) {
  await connectDB();

  try {
    return await queryFn();
  } catch (error) {
    if (!isTransientMongoError(error)) {
      throw error;
    }

    resetCachedConnection();
    await connectDB();
    return await queryFn();
  }
}
