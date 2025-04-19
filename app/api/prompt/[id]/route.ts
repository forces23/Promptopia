import { promptsCollection } from '@lib/prompts';
import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';

// Add TypeScript interfaces
interface PromptUpdate {
    prompt: string;
    tag: string;
  }

export const GET = async (req: Request, { params }: any) => {
    try {
        console.log('Request recieved...');

        // Convert string ID to MongoDB ObjectId
        const postId = new ObjectId(params.id);
        
        // Find the post using ObjectId
        const post = await promptsCollection().findOne({ 
            _id: postId 
        });

        if (!post) {
            return new Response("Post Not Found", { 
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Convert MongoDB document to plain JavaScript object
        const sanitizedPost = {
            ...post,
            _id: post._id.toString(),
            creator: {
                ...post.creator,
                _id: post.creator._id.toString()
            }
        };

        return new Response(JSON.stringify(sanitizedPost), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.log(error);
        return new Response('Failed to search for post', { status: 500 })
    }
}

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const { prompt, tag }: PromptUpdate = await req.json(); // Fixed destructuring
        
        // Convert string ID to ObjectId
        const postId = new ObjectId(params.id);

        // Use atomic update operation
        const result = await promptsCollection().findOneAndUpdate(
            { _id: postId },  // Use ObjectId here
            {
                $set: {
                    prompt: prompt,
                    tag: tag,
                    updatedAt: new Date()
                }
            },
            {
                returnDocument: 'after',
                projection: { _id: 1, prompt: 1, tag: 1, createdAt: 1 },
                includeResultMetadata: true // Add this to get proper typing
            }
        );

        // Proper check for found document
        if (!result.value) {
            return new Response("Post Not Found", { status: 404 });
        }

        return new Response(JSON.stringify(result.value), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });


    } catch (error) {
        console.log(error);
        return new Response('Failed to update post', { status: 500 });
    }
}



export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        // const session = await auth();
        // if (!session?.user?.id) {
        //     return new Response("Unauthorized", { status: 401 });
        // }

        const postId = new ObjectId(params.id);
        
        // Delete with ownership check
        const result = await promptsCollection().deleteOne({
            _id: postId,
            // "creator._id": new ObjectId(session.user.id)
        });

        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({ 
                error: "Post not found or unauthorized"
            }), { 
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("Delete error:", error);
        return new Response(JSON.stringify({ error: 'Failed to delete post' }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}