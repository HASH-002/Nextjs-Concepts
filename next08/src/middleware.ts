import { NextResponse } from "next/server";

const allowedOrigins =
    process.env.NODE_ENV === "production"
        ? ["http://www.yoursite.com"]
        : ["http://localhost:3000", "https://www.google.com"];

export function middleware(request: Request) {
    // conditional middleware
    // const regex = new RegExp('/api/*')
    // if(regex.test(request.url)){

    // }

    // if(request.url.includes('/api/')){

    // }

    const origin = request.headers.get("origin");
    console.log(origin);

    // !origin also covers extension (thundeclient) requests
    if (origin && !allowedOrigins.includes(origin)) {
        return new NextResponse(null, {
            status: 400,
            statusText: "Bad Request",
            headers: {
                "Content-Type": "text/plain",
            },
        });
    }
    console.log("Middleware !");

    console.log(request.method);
    console.log(request.url);

    return NextResponse.next();
}

export const config = {
    matcher: "/api/:path*",
};
