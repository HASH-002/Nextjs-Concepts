export default async function getUserPosts(userId: string) {
    // This returns (object) first post of user
    // const res = await fetch(
    //     `https://jsonplaceholder.typicode.com/posts/${userId}`
    // );

    // This returns all posts of user (return type is array)
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}
