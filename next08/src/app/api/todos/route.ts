import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";
const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET(request: Request) {
    const origin = request.headers.get("origin");

    const res = await fetch(DATA_SOURCE_URL);
    const todos: Todo[] = await res.json();
    // return NextResponse.json(todos);

    // for cors we have to make sure always have access control allow origin
    return new Response(JSON.stringify(todos), {
        headers: {
            "Access-Control-Allow-Origin": origin || "*",
            "Content-Type": "application/json",
        },
    });
}

// export async function POST(request: Request) {
//     // const { userId, title }: Partial<Todo> = await request.json();
//     const data = await request.json();
//     console.log(data);
//     if (!data) return NextResponse.json({ message: "Missing required data" });
//     const { userId, title } = data;
//     if (!userId || !title)
//         return NextResponse.json({ message: "Missing required data" });

//     const res = await fetch(DATA_SOURCE_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "API-Key": API_KEY,
//         },
//         body: JSON.stringify({
//             userId,
//             title,
//             completed: false,
//         }),
//     });
//     const newTodo = await res.json();
//     return NextResponse.json(newTodo);
// }

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log(data);
        if (!data)
            return NextResponse.json({ message: "Missing required data" });
        const { userId, title } = data;
        if (!userId || !title)
            return NextResponse.json({ message: "Missing required data" });

        const res = await fetch(DATA_SOURCE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "API-Key": API_KEY,
            },
            body: JSON.stringify({
                userId,
                title,
                completed: false,
            }),
        });
        const newTodo = await res.json();
        return NextResponse.json(newTodo);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Invalid JSON data" });
    }
}

export async function PUT(request: Request) {
    const { userId, title, id, completed }: Todo = await request.json();

    if (!userId || !title || !id || typeof completed !== "boolean")
        return NextResponse.json({ message: "Missing required data" });

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "API-Key": API_KEY,
        },
        body: JSON.stringify({
            userId,
            title,
            completed,
        }),
    });
    const updatedTodo = await res.json();
    return NextResponse.json(updatedTodo);
}

export async function DELETE(request: Request) {
    const { id }: Partial<Todo> = await request.json();

    if (!id) return NextResponse.json({ message: "Todo id required" });

    await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "API-Key": API_KEY,
        },
    });

    return NextResponse.json({ message: `Todo ${id} deleted` });
}
