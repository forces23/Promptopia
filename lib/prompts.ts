import client from "@lib/db";
import { ObjectId } from 'mongodb';

type User = {
  _id: ObjectId;
  username: string;
  email: string;
  image: string;
}

interface Prompt {
  creator: User;
  prompt: string;
  tag: string;
  createdAt: Date;
}

export const promptsCollection = () => {
    console.log('prompt mongo db adapter setup... ')
  return client.db("promptopia_db").collection<Prompt>('prompts');
};