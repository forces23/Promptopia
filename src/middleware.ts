// import { runWithAmplifyServerContext } from "@/src/utils/utils";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    // console.log('\n===== MIDDLEWARE TRIGGERED =====');
    // console.log('Incoming request to:', request.nextUrl.pathname);
    // console.log('Request headers:', Object.fromEntries(request.headers.entries()));

    // const response = NextResponse.next();
    // console.log('\n[MiddleWare] Starting Amplify auth check...');
    // const authenticated = await runWithAmplifyServerContext({
    //     nextServerContext: { request, response },
    //     operation: async (context) => {
    //         console.log('[MiddleWare] context: ', context);
    //         try {
    //             console.log('[MiddleWare] Inside Amplify context - fetching session...');

    //             const session = await fetchAuthSession(context);
    //             const isAuthenticated = session.tokens !== undefined;
    //             console.log('[MiddleWare] isAuthenticated:', session.tokens !== undefined);
    //             console.log('[MiddleWare] Session tokens:', session.tokens?.accessToken);

    //             return isAuthenticated;
    //         } catch (error) {
    //             console.error('[MiddleWare] Auth session error:', error);
    //             return false;
    //         }
    //     }
    // });

    // console.log('\n[MiddleWare] Auth check result:', authenticated);

    // if (authenticated) {
    //     console.log('[MiddleWare] User authenticated - allowing access');
    //     return response;
    // } else {
    //     console.log('[MiddleWare] User not authenticated - redirecting to signin');
    //     // return NextResponse.redirect(new URL('/signin', request.url));
    //     return response;
    // }
}

export const config = {
    matcher: [
        // Match all paths except:
        '/((?!signin|test|api|_next\/static|_next\/image|favicon.ico|.*\.png$|.*\.jpg$).*)'
    ]
};





// TODO:: LOOK INTO THIS LATER
// bedrock claude 3.7 generated:
// import { createServerRunner } from "@aws-amplify/adapter-nextjs";
// import { fetchAuthSession } from "aws-amplify/auth/server";
// import outputs from "@/amplify_outputs.json";
// import { NextRequest, NextResponse } from "next/server";

// const { runWithAmplifyServerContext } = createServerRunner({
//   config: outputs
// });

// export async function middleware(request: NextRequest) {
//   const response = NextResponse.next();
  
//   try {
//     const result = await runWithAmplifyServerContext({
//       nextServerContext: { request, response },
//       operation: async (contextSpec) => {
//         try {
//           const session = await fetchAuthSession(contextSpec);
//           return { isAuthenticated: session.tokens !== undefined };
//         } catch (error) {
//           console.error('Auth error in middleware:', error);
//           return { isAuthenticated: false };
//         }
//       }
//     });
    
//     if (!result.isAuthenticated && !request.nextUrl.pathname.startsWith('/signin')) {
//       return NextResponse.redirect(new URL('/signin', request.url));
//     }
    
//     return response;
//   } catch (error) {
//     console.error('Middleware error:', error);
//     return response;
//   }
// }