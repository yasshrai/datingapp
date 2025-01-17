'use client'

import { useParams } from 'next/navigation'
import Usercard from './UserCard';
import { fetchPartner } from "@/app/actions/fetchPartner";
import { useState, useEffect } from 'react';

export default function PartnerPage() {
    const [userdata, setUserdata] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const params = useParams<{ email: string }>();
    const email = params.email;

    useEffect(() => {
        async function fetchPartnerData() {
            try {
                const data = await fetchPartner(email);
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
        return <div>Loading...</div>;
    }

    if (!userdata) {
        return <div>No user data found.</div>;
    }

    return (
        <Usercard userdata={userdata} />
    )
}

