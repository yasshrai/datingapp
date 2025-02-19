'use client'

import { useParams } from 'next/navigation'
import Usercard from './UserCard';
import { fetchPartnerSingle } from "@/app/actions/fetchPartner";
import { useState, useEffect } from 'react';
import {  Loader2 } from "lucide-react"
export default function PartnerPage() {
    const [userdata, setUserdata] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const params = useParams<{ email: string }>();
    const email = params.email;

    useEffect(() => {
        async function fetchPartnerData() {
            try {
                const data = await fetchPartnerSingle(email);
                setUserdata(data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPartnerData();
    }, [email]);

    if (loading) {
        return <div className='min-h-screen bg-stone-950'> <div className="flex justify-center items-center h-[70vh] md:h-[50vh]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div></div>;
    }

    if (!userdata) {
        return <div>No user data found.</div>;
    }

    return (
        <Usercard userdata={userdata} />
    )
}

