import { kv } from '@vercel/kv';
import { getSessionId, getSessionIdAndCreateIfMissing } from './index';

const namespace = process.env.NAMESPACE || "fctc-local";

export function get(key) {
    const sessionId = getSessionId();
    if (!sessionId) {
      return null;
    }
    return kv.hget(`session-${namespace}-${sessionId}`, key);
  }
  
export function getAll() {
  const sessionId = getSessionId();
  if (!sessionId) {
    return null;
  }
  return kv.hgetall(`session-${namespace}-${sessionId}`);
}

export function set(key, value) {
  const sessionId = getSessionIdAndCreateIfMissing();
  return kv.hset(`session-${namespace}-${sessionId}`, { [key]: value });
}