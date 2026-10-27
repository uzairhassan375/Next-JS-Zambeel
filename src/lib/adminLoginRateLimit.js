import crypto from 'crypto';
import mongoose from 'mongoose';
import { connectDB } from './db';

const WINDOW_MS = 15 * 60 * 1000;
const RETENTION_MS = 60 * 60 * 1000;
const MAX_IP_ATTEMPTS = 5;
const MAX_GLOBAL_ATTEMPTS = 100;
const COLLECTION_NAME = 'admin_login_rate_limits';

let ttlIndexPromise;

function getClientAddress(request) {
  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp.slice(0, 128);

  const forwardedFor = request.headers.get('x-forwarded-for');
  const forwardedIp = forwardedFor?.split(',').pop()?.trim();
  return forwardedIp ? forwardedIp.slice(0, 128) : 'unknown';
}

async function getRateLimitCollection() {
  await connectDB();
  const collection = mongoose.connection.db.collection(COLLECTION_NAME);

  if (!ttlIndexPromise) {
    ttlIndexPromise = collection.createIndex(
      { expiresAt: 1 },
      { expireAfterSeconds: 0, name: 'admin_login_rate_limits_ttl' },
    );
  }

  try {
    await ttlIndexPromise;
  } catch (error) {
    ttlIndexPromise = null;
    throw error;
  }

  return collection;
}

/**
 * Count login requests in a shared MongoDB window so limits apply across app instances.
 */
export async function consumeAdminLoginAttempt(request) {
  const now = Date.now();
  const windowStart = Math.floor(now / WINDOW_MS) * WINDOW_MS;
  const windowEnd = windowStart + WINDOW_MS;
  const ipHash = crypto
    .createHmac('sha256', process.env.ADMIN_SECRET || 'admin-login-rate-limit')
    .update(getClientAddress(request))
    .digest('hex');
  const collection = await getRateLimitCollection();

  async function consumeBucket(id) {
    const result = await collection.findOneAndUpdate(
      { _id: id },
      {
        $inc: { attempts: 1 },
        $setOnInsert: { expiresAt: new Date(windowEnd + RETENTION_MS) },
      },
      { upsert: true, returnDocument: 'after' },
    );
    return result?.value ?? result;
  }

  const ipRecord = await consumeBucket(`ip:${ipHash}:${windowStart}`);
  if (ipRecord.attempts > MAX_IP_ATTEMPTS) {
    return {
      limited: true,
      retryAfter: Math.max(1, Math.ceil((windowEnd - now) / 1000)),
    };
  }

  const globalRecord = await consumeBucket(`global:${windowStart}`);

  return {
    limited: globalRecord.attempts > MAX_GLOBAL_ATTEMPTS,
    retryAfter: Math.max(1, Math.ceil((windowEnd - now) / 1000)),
  };
}
