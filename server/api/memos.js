// server/api/memos.js
import dbPromise from '../database';

export default defineEventHandler(async (event) => {
  const method = event.req.method;

  if (method === 'POST') {
    const body = await readBody(event);
    const { user, text } = body;
    const date = new Date().toISOString();

    if (!user || !text) {
      return { success: false, message: 'User and text are required' };
    }

    const db = await dbPromise;
    await db.run('INSERT INTO memos (user, text, date) VALUES (?, ?, ?)', [user, text, date]);

    return { success: true, message: 'Memo created successfully' };
  } else if (method === 'GET') {
    const db = await dbPromise;
    const memos = await db.all('SELECT * FROM memos');

    return { success: true, memos };
  } else {
    return { success: false, message: 'Method not allowed' };
  }
});