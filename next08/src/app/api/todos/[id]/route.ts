import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

type Props = {
    params: {
        id: string;
    };
};
export async function GET(request: Request, { params: { id } }: Props) {
    // Not a recommended nextjs way so we will tak one more parameter and declare type since we are using typscript
    //const id = request.url.slice(request.url.lastIndexOf("/") + 1);

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`);
    const todo: Todo = await res.json();
    // console.log(todo);
    if (!todo.id) return NextResponse.json({ message: "Todo not found" });

    return NextResponse.json(todo);
}
