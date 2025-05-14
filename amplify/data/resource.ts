import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
// figure out if this is all i need to set up a backend using aws amplif/DynamoDB 
// later figure out how to connect to Aurora PostgreSQL RDS
const schema = a.schema({
  User: a.model({
    userName: a.string(),
    email: a.string(),
    avatar: a.string(),
  }).authorization((allow) => [
    allow.authenticated(),
    allow.guest().to(['read'])
  ]),

  Prompts: a.model({
    creator: a.string(),
    prompt: a.string(),
    tag: a.string(),
    // createAt: a.date(),
  }).authorization((allow) => [
    allow.authenticated(),
    allow.guest().to(['read'])
  ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    
  },
});
