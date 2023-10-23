// Use official mongodb driver to connect to the server
import { Collection, MongoClient } from 'mongodb';

let collection: Collection<Document> | undefined = undefined;

if (process.env.AZURE_COSMOS_CONNECTIONSTRING) {
    // New instance of MongoClient with connection string
    // for Cosmos DB
    const client = new MongoClient(process.env.AZURE_COSMOS_CONNECTIONSTRING);

    // Use connect method to connect to the server
    await client.connect();

    // Database reference with creation if it does not already exist
    const db = client.db(`blogs`);

    // Collection reference with creation if it does not already exist
    collection = db.collection('posts');
}

import { promises as fs } from "fs";
import path from "path";

const LOCAL_POSTS_DIR = path.resolve("src", "lib", "posts");

interface PostSlugAndTitle {
    slug: string;
    title: string;
}

interface Post {
    slug: string;
    title: string;
    date: Date;
    content: string | string[];
    imageSrcFallback: string;
    imageSrcWebp?: string;
}

interface PostSummary {
    slug: string;
    category: string;
    title: string;
    date: Date;
    description: string;
    imageSrcFallback: string;
    imageSrcWebp?: string;
}

async function getPostFromDb(slug: string): Promise<Post | null> {
    return await collection!.findOne<Post>({ slug: slug, }, { projection: { _id: 0, } });
}

async function getPostSummariesFromDb(): Promise<PostSummary[]> {
    return await collection!.find<PostSummary>({}, { projection: { _id: 0, } }).sort({ date: -1 }).toArray();
}

async function getPostFromLocal(slug: string): Promise<Post | null> {
    try {
        const filePath = path.join(LOCAL_POSTS_DIR, `${slug}.json`);
        const fileContents = await fs.readFile(filePath, "utf-8");
        const post: Post = JSON.parse(fileContents, (_key, value) => {
            if (value && typeof value === 'object' && value.hasOwnProperty("$date")) {
                return new Date(value["$date"]);
            }
            return value;
        });
        return post;
    } catch (err) {
        console.error(`Failed to fetch local post for slug: ${slug}`, err);
        return null;
    }
}

async function getPostSummariesFromLocal(): Promise<PostSummary[]> {
    try {
        const fileNames = await fs.readdir(LOCAL_POSTS_DIR);
        const postSummaries: PostSummary[] = [];

        for (const fileName of fileNames) {
            const filePath = path.join(LOCAL_POSTS_DIR, fileName);

            // Check if the current path is a file before trying to read it
            const stats = await fs.stat(filePath);
            if (!stats.isFile()) {
                continue; // Skip directories or other non-file entities
            }

            const fileContents = await fs.readFile(filePath, "utf-8");
            const postSummary: PostSummary = JSON.parse(fileContents, (_key, value) => {
                if (value && typeof value === 'object' && value.hasOwnProperty("$date")) {
                    return new Date(value["$date"]);
                }
                return value;
            });
            postSummaries.push(postSummary);
        }

        // Sort the summaries by date, assuming 'date' is a Date object
        return postSummaries.sort((a, b) => b.date.getTime() - a.date.getTime());
    } catch (err) {
        console.error("Failed to fetch local post summaries", err);
        return [];
    }
}

async function getPostSummariesFromLocalWithCategory(category: string): Promise<PostSummary[]> {
    const postSummaries = await getPostSummariesFromLocal();
    return postSummaries.filter(post => post.category === category);
}

export async function getPreviousPostSlugAndTitle(slug: string): Promise<PostSlugAndTitle | null> {
    if (collection) {
        const currentPost = await getPostFromDb(slug);
        if (!currentPost) return null;

        const previousPost = await collection!.findOne<PostSlugAndTitle>(
            { date: { $lt: currentPost.date } },
            { projection: { slug: 1, title: 1, _id: 0 }, sort: { date: -1 }, limit: 1 }
        );
        return previousPost;
    }
    else {
        const postSummaries = await getPostSummariesFromLocal();
        const index = postSummaries.findIndex(p => p.slug === slug);

        if (index === -1 || index === 0) return null;

        return {
            slug: postSummaries[index - 1].slug,
            title: postSummaries[index - 1].title
        };
    }
}

export async function getNextPostSlugAndTitle(slug: string): Promise<PostSlugAndTitle | null> {
    if (collection) {
        const currentPost = await getPostFromDb(slug);
        if (!currentPost) return null;

        const nextPost = await collection!.findOne<PostSlugAndTitle>(
            { date: { $gt: currentPost.date } },
            { projection: { slug: 1, title: 1, _id: 0 }, sort: { date: 1 }, limit: 1 }
        );
        return nextPost;
    }
    else {
        const postSummaries = await getPostSummariesFromLocal();
        const index = postSummaries.findIndex(p => p.slug === slug);

        if (index === -1 || index === postSummaries.length - 1) return null;

        return {
            slug: postSummaries[index + 1].slug,
            title: postSummaries[index + 1].title
        };
    }
}

export async function getPreviousPostSlugAndTitleWithinCategory(slug: string, category: string): Promise<PostSlugAndTitle | null> {
    if (collection) {
        const currentPost = await getPostFromDb(slug);
        if (!currentPost) return null;

        const previousPost = await collection!.findOne<PostSlugAndTitle>(
            { category: category, date: { $lt: currentPost.date } },
            { projection: { slug: 1, title: 1, _id: 0 }, sort: { date: -1 }, limit: 1 }
        );
        return previousPost;
    }
    else {
        const postSummaries = await getPostSummariesFromLocalWithCategory(category);
        const index = postSummaries.findIndex(p => p.slug === slug);

        if (index === -1 || index === 0) return null;

        return {
            slug: postSummaries[index - 1].slug,
            title: postSummaries[index - 1].title
        };
    }
}

export async function getNextPostSlugAndTitleWithinCategory(slug: string, category: string): Promise<PostSlugAndTitle | null> {
    if (collection) {
        const currentPost = await getPostFromDb(slug);
        if (!currentPost) return null;

        const nextPost = await collection!.findOne<PostSlugAndTitle>(
            { category: category, date: { $gt: currentPost.date } },
            { projection: { slug: 1, title: 1, _id: 0 }, sort: { date: 1 }, limit: 1 }
        );
        return nextPost;
    }
    else {
        const postSummaries = await getPostSummariesFromLocalWithCategory(category);
        const index = postSummaries.findIndex(p => p.slug === slug);

        if (index === -1 || index === postSummaries.length - 1) return null;

        return {
            slug: postSummaries[index + 1].slug,
            title: postSummaries[index + 1].title
        };
    }
}

export async function getPost(slug: string): Promise<Post | null> {
    if (collection) {
        return getPostFromDb(slug)
    }
    else {
        return getPostFromLocal(slug)
    }
}

export async function getPostSummaries(): Promise<PostSummary[]> {
    if (collection) {
        return getPostSummariesFromDb()
    }
    else {
        return getPostSummariesFromLocal()
    }
}

export async function getCategories(): Promise<string[]> {
    if (collection) {
        return await collection.distinct("category");
    } else {
        // For local posts, read from each post and gather the categories
        const postSummaries = await getPostSummariesFromLocal();
        const categoriesSet = new Set(postSummaries.map(post => post.category));
        return Array.from(categoriesSet);
    }
}

export async function getPostSummariesByCategory(category: string): Promise<PostSummary[]> {
    if (collection) {
        return await collection.find<PostSummary>({ category: category }, { projection: { _id: 0 } }).sort({ date: -1 }).toArray();
    } else {
        return await getPostSummariesFromLocalWithCategory(category);
    }
}

