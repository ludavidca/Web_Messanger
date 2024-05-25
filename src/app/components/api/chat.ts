import { db } from '~/server/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const insertedMessage = await db.insert('messages').values({ message }).returning();

      res.status(200).json({ success: true, message: insertedMessage });
    } catch (error) {
      console.error('Error inserting message into database:', error);
      res.status(500).json({ error: 'Failed to insert message into database' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}