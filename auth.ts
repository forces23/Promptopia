
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { GitHub_Auth_URL } from "@constants";


// import User from '@models copy/user';
import client from "@lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(client),
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent", // Forces consent screen every time (optional)
                    access_type: "offline", // Required for refresh tokens
                    response_type: "code", // Recommended for server-side auth
                }
            },
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "login",
                    auth_type: "reauthenticate",
                    scope: "read:user user:email",
                }
            },
            profile: async (profile, tokens) => {
                // Fetch emails from GitHub API
                const emailsResponse = await fetch(GitHub_Auth_URL, {
                    headers: {
                        Authorization: `token ${tokens.access_token}`,
                        Accept: "application/vnd.github.v3+json",
                    },
                })
                const emails = await emailsResponse.json()

                // Find primary email
                const primaryEmail = emails.find((e: any) => e.primary)?.email
                const verifiedEmail = emails.find((e: any) => e.verified)?.email

                return {
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    email: primaryEmail || verifiedEmail || profile.email,
                    image: profile.avatar_url,
                    username: profile.login.toLowerCase()
                }
            }
        })
    ],
    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id;

            return session
        },
        // async signIn({ profile }) {
        //     try {
        //         await connectToDB();

        //         const userExists = await User.findOne({ email: profile?.email });

        //         if (!userExists) {
        //             // Add your user creation logic here
        //             await User.create({
        //                 email: profile?.email ,
        //                 // username: profile?.login, // github username
        //                 username: profile?.name?.replace(' ', '') || profile?.login,
        //                 image: profile?.avatar_url
        //             });
        //         }

        //         return true;
        //     } catch (err) {
        //         console.log(err);
        //         return false;
        //     }

        // }
    }
})