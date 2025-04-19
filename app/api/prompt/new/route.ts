import { promptsCollection } from '@lib/prompts';
import { auth } from '@auth';
import { ObjectId } from 'mongodb';
import client from '@lib/db';

export const POST = async (req: Request) => {
  try {
    console.log('Request received');
    const session = await auth();
    console.log('Session:', session);

    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { 
        status: 401,
        headers: {'Content-Type': 'application/json'}
      });
    }

    const { prompt, tag } = await req.json();
    
    // Validate input
    if (!prompt || !tag) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: {'Content-Type': 'application/json'}
      });
    }

    // Verify connection
    await client.connect();
    
    const result = await promptsCollection().insertOne({
      creator: {
        _id: new ObjectId(session.user.id),
        username: session.user.name || 'Anonymous',
        email:session.user.email || 'anonymous@anon.com',
        image: session.user.image || '/default-avatar.png'
      }, 
      prompt: prompt.trim(),
      tag: tag.trim(),
      createdAt: new Date()
    });

    console.log("Insert result:", result);
    
    return new Response(JSON.stringify(result), { 
      status: 201,
      headers: {'Content-Type': 'application/json'}
    });
    
  } catch (error) {
    console.error("Error creating prompt:", error);
    return new Response(JSON.stringify({ 
      error: "Internal Server Error",
      details: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers: {'Content-Type': 'application/json'}
    });
  }
};