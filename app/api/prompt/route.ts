import { promptsCollection } from '@lib/prompts';

export const GET = async (req: Request) => {
    try {
        console.log('Request recieved...');

        const posts = await promptsCollection()
        .find()
        .sort({ createdAt: -1}) // Newest first
        .toArray();

        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })


    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch all prompts', { status: 500 })
    }
}