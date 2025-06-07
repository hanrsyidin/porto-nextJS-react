import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

async function getCommentsCollection() {
  const client = await clientPromise;
  const db = client.db('portfolioCluster');
  return db.collection('comments');
}

/**
 * @method GET
 * @description
 */
export async function GET() {
  try {
    const commentsCollection = await getCommentsCollection();
    const comments = await commentsCollection
      .find({})
      .sort({ timestamp: -1 })
      .toArray();
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error('Gagal mengambil komentar:', error);
    return NextResponse.json({ error: 'Gagal mengambil komentar.' }, { status: 500 });
  }
}

/**
 * @method POST
 * @description
 */
export async function POST(request: NextRequest) {
  try {
    const { name, message } = await request.json();

    if (!name || !message || typeof name !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ error: 'Nama dan pesan harus diisi.' }, { status: 400 });
    }

    const commentsCollection = await getCommentsCollection();
    
    const newComment = {
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date(),
    };

    const result = await commentsCollection.insertOne(newComment);

    return NextResponse.json({ ...newComment, _id: result.insertedId }, { status: 201 });

  } catch (error) {
    console.error('Gagal memposting komentar:', error);
    return NextResponse.json({ error: 'Gagal memposting komentar.' }, { status: 500 });
  }
}