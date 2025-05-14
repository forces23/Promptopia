import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";
import outputs from "@/amplify_outputs.json";
import { cookies } from "next/headers";

console.log('\n[UTILS] ===== LOADING AMPLIFY UTILS =====');

// export const { runWithAmplifyServerContext } = createServerRunner({
//     config: outputs
// });

/**
 * Gets the current authenticated user from Amplify
 * @returns The current user or null if not authenticated
 */
export async function GetAuthCurrentUserServer() {
    // try{
    //     console.log('\n[UTILS] Getting current user...');
    //     // const currentCookies = cookies();
    //     // console.log('\n[UTILS] Getting current user...');

    //     const currentUser = await runWithAmplifyServerContext({
    //         nextServerContext: { cookies },
    //         operation: async (context) => {
    //             console.log('[UTILS] Inside Amplify server context');
    //             return await getCurrentUser(context)
    //         }
    //     });

    //     console.log('[UTILS] Current user:', currentUser);
    //     return currentUser;
    // } catch (error) {
    //     console.error("[UTILS] Error getting current user:", error);
    //     return null; 
    // }
}

export async function GetAuthSessionServer() {
    // try {
    //     console.log('\n[UTILS] Getting current session...');
    //     const currentCookies = cookies();
    //     console.log('[UTILS] Current cookies:', currentCookies);

    //     const session = await runWithAmplifyServerContext({
    //         nextServerContext: { cookies },
    //         operation: async (context) => {
    //             console.log('[UTILS] Inside Amplify server context');
    //             return await fetchAuthSession(context);
    //         }
    //     });

    //     console.log('[UTILS] Current session:', session);
    //     return session;
    // } catch (error) {
    //     console.error("[UTILS] Error getting auth session:", error);
    //     return null; 
    // }
}
