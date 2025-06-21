import { NextRequest, NextResponse } from "next/server";

/** 
 * 中间件
 * 
 * @param request 请求
 * @returns 
 */
export default function middleware(request: NextRequest) {

    /*
     *  方式二：重定向、重写路径
     */

    // 获取请求路径
    const pathname = request.nextUrl.pathname;
    if (pathname.startsWith('/about')) {
        return NextResponse.rewrite(new URL('/about/1', request.url));
    }

    if (pathname.startsWith('/posts')) {
        return NextResponse.rewrite(new URL('/posts/1', request.url));
    }
}

// /**
//  * 方式一: 配置中间件匹配路径 
//  */
// export const config = {

//     // // /about:path* 表示匹配 /about 路径，并且路径后面可以有任意字符
//     // // /posts 表示只匹配 /posts 路径
//     // matcher: ['/about:path*', '/posts'],

//     // /((?!api|_next/static|_next/image|favicon.ico).*) 表示匹配所有路径，除了 api、_next/static、_next/image、favicon.ico 路径
//     matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)/'],
// };