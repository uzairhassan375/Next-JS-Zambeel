import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please set MONGODB_URI in .env.local');
}

const CONNECT_OPTIONS = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  heartbeatFrequencyMS: 10000,
  maxPoolSize: 10,
  minPoolSize: 0,
  maxIdleTimeMS: 60000,
  retryWrites: true,
  retryReads: true,
};

const CONNECT_BACKOFF_MS = [500, 1500, 3000];

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
    listenersAttached: false,
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function attachListenersOnce() {
  if (cached.listenersAttached) return;
  cached.listenersAttached = true;

  mongoose.connection.on('disconnected', () => {
    console.warn('[db] disconnected');
    cached.conn = null;
    cached.promise = null;
  });

  mongoose.connection.on('reconnected', () => {
    console.info('[db] reconnected');
  });

  mongoose.connection.on('error', (error) => {
    console.error('[db] error', error);
  });
}

attachListenersOnce();

async function hardReset() {
  cached.conn = null;
  cached.promise = null;
  try {
    await mongoose.disconnect();
  } catch {
    // ignore disconnect errors during reset
  }
}

function isTransientMongoError(error) {
  const name = String(error?.name || '');
  const message = String(error?.message || '').toLowerCase();
  const transientNames = [
    'MongoServerSelectionError',
    'MongooseServerSelectionError',
    'MongoStalePrimaryError',
    'MongoNetworkError',
    'MongoNetworkTimeoutError',
    'MongoTopologyClosedError',
    'MongoNotConnectedError',
    'MongoExpiredSessionError',
    'MongoPoolClearedError',
  ];

  if (transientNames.includes(name)) return true;

  if (typeof error?.hasErrorLabel === 'function') {
    if (error.hasErrorLabel('RetryableWriteError') || error.hasErrorLabel('ResetPool')) {
      return true;
    }
  }

  return (
    message.includes('stale') ||
    message.includes('primary') ||
    message.includes('replicasetnoprimary') ||
    message.includes('no primary') ||
    message.includes('not primary') ||
    message.includes('topology') ||
    message.includes('server selection') ||
    message.includes('connection') ||
    message.includes('not connected') ||
    message.includes('econnrefused') ||
    message.includes('econnreset') ||
    message.includes('timed out') ||
    message.includes('etimedout')
  );
}

async function connectWithRetry() {
  let lastError;

  for (let attempt = 0; attempt < 3; attempt++) {
    // Drop any broken handle before (re)connect; keep this in-flight promise
    const inFlight = cached.promise;
    await hardReset();
    cached.promise = inFlight;

    try {
      const conn = await mongoose.connect(MONGODB_URI, CONNECT_OPTIONS);
      cached.conn = conn;
      return conn;
    } catch (error) {
      lastError = error;
      console.error(`[db] connect attempt ${attempt + 1}/3 failed`, error?.name || error);
      if (attempt < 2) {
        await sleep(CONNECT_BACKOFF_MS[attempt]);
      }
    }
  }

  throw lastError;
}

export async function connectDB() {
  if (mongoose.connection.readyState === 1 && cached.conn) {
    return cached.conn;
  }

  if (mongoose.connection.readyState === 1) {
    cached.conn = mongoose;
    return cached.conn;
  }

  if (cached.promise) {
    return cached.promise;
  }

  cached.promise = connectWithRetry();

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    throw error;
  }
}

/**
 * Run a DB query with automatic reconnect+retry on transient
 * connection/topology failures (e.g. Atlas replica set election).
 */
export async function withDB(queryFn) {
  let lastError;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await connectDB();
      return await queryFn();
    } catch (error) {
      lastError = error;

      if (!isTransientMongoError(error)) {
        throw error;
      }

      if (attempt >= 2) {
        throw error;
      }

      console.warn(`[db] transient error on attempt ${attempt + 1}/3, hard reset + retry`, error?.name || error);
      await hardReset();
      await sleep(CONNECT_BACKOFF_MS[attempt]);
    }
  }

  throw lastError;
}

export async function pingDB() {
  await connectDB();
  return mongoose.connection.db.admin().command({ ping: 1 });
}
