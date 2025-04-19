import { promptsCollection } from '@lib/prompts';
import { auth } from '@auth';
import { ObjectId } from 'mongodb';
import client from '@lib/db';


export const GET = async (req: Request, {params}:any) => {
    // console.log('params: ', params); // DEBUG LOG
    try {
        console.log('Request recieved...');
        // const session = await auth();
        const data = await params;

        // if (!session?.user?.id) {
        //     return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        //         status: 401,
        //         headers: { 'Content-Type': 'application/json' }
        //     })
        // }

        const userId = new ObjectId(data.id);
        // console.log('userId: ', userId); // DEBUG LOG

        const posts = await promptsCollection()
        .find({"creator._id": userId}) // <-- specify the creator of the posts
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