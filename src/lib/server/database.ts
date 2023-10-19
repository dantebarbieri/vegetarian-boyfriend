import ColoradoHiking from '$lib/assets/colorado-hiking.jpg';
import ColoradoHikingWebp from '$lib/assets/colorado-hiking.webp';
import FonduelandBackpack from '$lib/assets/fondueland-backpack.jpg';
import FonduelandBackpackWebp from '$lib/assets/fondueland-backpack.webp';

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

const posts: (Post & PostSummary)[] = [
    {
        slug: "colorado-hiking",
        title: "Colorado Hiking",
        date: new Date(2023, 7, 16),
        content: "This is the first post.",
        description: "Discover the serenity of Colorado's wilderness: Where every step reveals nature's majesty and every view takes your breath away. Join me on a journey through the Rockies!",
        imageSrcFallback: ColoradoHiking,
        imageSrcWebp: ColoradoHikingWebp,
    },
    {
        slug: "fondueland-backpack",
        title: "Fondue Land (Gstaad) Backpack",
        date: new Date(2023, 6, 10),
        content: "This is the second post.",
        description: "Fondue, mountains, and hiking – a trio that defines Swiss leisure. Dive into the heart of Gstaad's Fondue Hike and discover what makes it tick.",
        imageSrcFallback: FonduelandBackpack,
        imageSrcWebp: FonduelandBackpackWebp,
    },
];

export async function getPost(slug: string): Promise<Post | undefined> {
    return posts.find((post) => post.slug === slug) as Post;
}

export async function getPostSummaries(): Promise<PostSummary[]> {
    return posts as PostSummary[];
}
