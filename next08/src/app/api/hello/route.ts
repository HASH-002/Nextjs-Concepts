export async function DELETE(request: Request) {
    const { data } = await request.json();
    console.log(data);
    return new Response("Hello, Next.js!");
}
