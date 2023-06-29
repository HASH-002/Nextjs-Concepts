import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "...",
    description: "...",
};

export default function About() {
    // throw new Error("This is an error");
    return (
        <>
            <h1>About</h1>
            <Link href="/"> Link to Home Page</Link>
        </>
    );
}
