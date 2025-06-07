// app/api/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // Pastikan path ke lib/mongodb.ts benar, @/ adalah alias untuk root

// Fungsi untuk mendapatkan koleksi 'comments' dari database 'portfolio'
async function getCommentsCollection() {
  const client = await clientPromise;
  const db = client.db('portfolioCluster'); // Ganti 'portfolio' jika Anda menggunakan nama database lain
  return db.collection('comments'); // Nama collection adalah 'comments'
}

/**
 * @method GET
 * @description Mengambil semua komentar dari database, diurutkan dari yang terbaru.
 */
export async function GET() {
  try {
    const commentsCollection = await getCommentsCollection();
    const comments = await commentsCollection
      .find({})
      .sort({ timestamp: -1 }) // -1 untuk descending (terbaru dulu)
      .toArray();
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error('Gagal mengambil komentar:', error);
    return NextResponse.json({ error: 'Gagal mengambil komentar.' }, { status: 500 });
  }
}

/**
 * @method POST
 * @description Menyimpan komentar baru ke database.
 */
export async function POST(request: NextRequest) {
  try {
    const { name, message } = await request.json();

    // Validasi sederhana
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

    // Mengembalikan komentar yang baru dibuat beserta ID-nya
    return NextResponse.json({ ...newComment, _id: result.insertedId }, { status: 201 });

  } catch (error) {
    console.error('Gagal memposting komentar:', error);
    return NextResponse.json({ error: 'Gagal memposting komentar.' }, { status: 500 });
  }
}