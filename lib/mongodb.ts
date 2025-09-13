// lib/mongodb.ts
import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || 'elevenlabs_clone';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongoDBConnection {
  client: MongoClient;
  db: Db;
}

let cachedConnection: MongoDBConnection | null = null;

export async function connectToDatabase(): Promise<MongoDBConnection> {
  if (cachedConnection) {
    return cachedConnection;
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  cachedConnection = { client, db };
  return cachedConnection;
}

// Audio Document Interface
export interface AudioDocument {
  _id?: string;
  language: string;
  audioUrl: string;
  text: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

// Database Operations
export class AudioService {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async getAudioByLanguage(language: string): Promise<AudioDocument | null> {
    const collection = this.db.collection<AudioDocument>('audios');
    return await collection.findOne({ language: language.toLowerCase() });
  }

  async createAudio(audioData: Omit<AudioDocument, '_id' | 'createdAt' | 'updatedAt'>): Promise<AudioDocument> {
    const collection = this.db.collection<AudioDocument>('audios');
    const now = new Date();
    
    const document: Omit<AudioDocument, '_id'> = {
      ...audioData,
      createdAt: now,
      updatedAt: now
    };

    const result = await collection.insertOne(document);
    return { ...document, _id: result.insertedId.toString() };
  }

  async updateAudio(language: string, updateData: Partial<AudioDocument>): Promise<AudioDocument | null> {
    const collection = this.db.collection<AudioDocument>('audios');
    
    const result = await collection.findOneAndUpdate(
      { language: language.toLowerCase() },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      },
      { returnDocument: 'after' }
    );

    return result.value;
  }

  async getAllAudios(): Promise<AudioDocument[]> {
    const collection = this.db.collection<AudioDocument>('audios');
    return await collection.find({}).toArray();
  }
}