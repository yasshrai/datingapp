"use client";
import LikedList from "./Likedlist";
import { useLikes } from "@/hooks/uselikes"

export default function LikesPage() {
    const { likes, error, loading } = useLikes();

    if (loading) {
        return <p className="text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Likes</h1>
            <LikedList likes={likes} />
        </div>
    );
}
