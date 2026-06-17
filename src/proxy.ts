import { NextRequest, NextResponse } from "next/server"
import { auth } from "./auth";

const PUBLIC_ROUTES=["/", "/signin"];

export async function proxy(req:NextRequest){

    const {pathname} = req.nextUrl;
    
    if(pathname.startsWith("/_next/") || pathname.startsWith("/favicon.ico") || pathname.startsWith(".")){
        return NextResponse.next();
    }

    // if(PUBLIC_ROUTES.includes(pathname)){
    //     return NextResponse.next();
    // }

    
    if(pathname.startsWith("/api/auth")){
        return NextResponse.next();
    }

    if(PUBLIC_ROUTES.includes(pathname)){
        return NextResponse.next();
    }


    const session = await auth()

    if(!session){
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    const role = session.user?.role;

    if(pathname.startsWith("/admin") && role !== "admin"){
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    if(pathname.startsWith("/partner") && role !== "partner"){
        if(pathname.startsWith("/partner/onboarding/vehicle")){
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    if(pathname.startsWith("/user") && role !== "user"){
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    if(pathname.startsWith("/api") && !session.user){
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    return NextResponse.next();
}


export const config = {
    matcher: ["/((?!_next/|favicon.ico|.*\\.).*)"]
}

// ===============>>>>>>>>>> new code <<<<<<<<<<=================
// ===============>>>>>>>>>> new code <<<<<<<<<<=================

// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "./auth";

// const PUBLIC_ROUTES = ["/", "/signin"];

// export async function proxy(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Static files
//   if (
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/favicon.ico") ||
//     pathname.includes(".")
//   ) {
//     return NextResponse.next();
//   }

//   // All NextAuth routes bypass ✅✅
//   if (pathname.startsWith("/api/auth")) {
//     return NextResponse.next();
//   }

//   // Public routes bypass ✅✅
//   if (PUBLIC_ROUTES.includes(pathname)) {
//     return NextResponse.next();
//   }

//   const session = await auth();

//   if (!session) {
//     return NextResponse.redirect(
//       new URL("/signin", req.url)
//     );
//   }

//   const role = session.user?.role;

//   if (pathname.startsWith("/admin") && role !== "admin") {
//     return NextResponse.redirect(
//       new URL("/", req.url)
//     );
//   }

//   if (pathname.startsWith("/partner") && role !== "partner") {
//     return NextResponse.redirect(
//       new URL("/", req.url)
//     );
//   }

//   if (pathname.startsWith("/user") && role !== "user") {
//     return NextResponse.redirect(
//       new URL("/", req.url)
//     );
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };