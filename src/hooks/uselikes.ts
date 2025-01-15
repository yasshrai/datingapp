import { useEffect, useState } from "react";
import axios from "axios";
import { Like } from "@/app/likes/Likedlist";

interface UseLikesReturn {
    likes: Like[];
    error: string | null;
    loading: boolean;
}

export function useLikes(): UseLikesReturn {
    const [likes, setLikes] = useState<Like[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchLikes() {
            try {
                const response = await axios.get("/api/like");
                setLikes(response.data.data);
            } catch (err) {
                setError("Failed to load likes. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchLikes();
    }, []);

    return { likes, error, loading };
}
