// Read .env file and set environment variables
import 'dotenv/config'

// Use official mongodb driver to connect to the server
import { MongoClient } from 'mongodb';

// New instance of MongoClient with connection string
// for Cosmos DB
const url = process.env.COSMOS_CONNECTION_STRING;

const client = new MongoClient(url as string);

// Use connect method to connect to the server
await client.connect();

// Database reference with creation if it does not already exist
const db = client.db(`blogs`);

// Collection reference with creation if it does not already exist
const collection = db.collection('posts');

interface Post {
    slug: string;
    title: string;
    date: Date;
    content: string;
    imageSrcFallback: string;
    imageSrcWebp?: string;
}

interface PostSummary {
    slug: string;
    title: string;
    date: Date;
    description: string;
    imageSrcFallback: string;
    imageSrcWebp?: string;
}

export async function getPost(slug: string): Promise<Post | null> {
    return await collection.findOne<Post>({ slug: slug, }, { projection: { _id: 0, } });
}

export async function getPostSummaries(): Promise<PostSummary[]> {
    return await collection.find<PostSummary>({}, { projection: { _id: 0, } }).sort({ date: -1 }).toArray();
}
