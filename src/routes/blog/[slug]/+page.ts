import type { PageLoad } from './$types';
export const load: PageLoad = async ({ params }) => {
    const response = await fetch(`/${params.slug}.json`);
    return {
        post: await response.json(),
    };
};