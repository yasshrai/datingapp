"use client";

import LikedList from "./Likedlist";
import { useLikes } from "@/hooks/uselikes"
import { Loader2 } from "lucide-react";

export default function LikesPage() {
    const { likes, error, loading } = useLikes();

    if (loading) {
        return <div className='min-h-screen bg-stone-950'> <div className="flex justify-center items-center h-[70vh] md:h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div></div>;;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Likes</h1>
            <LikedList likes={likes} />
        </div>
    );
}
