
import { notFound } from 'next/navigation'
import { Partner } from '@/types/partner';
import PartnerCardSingle from '@/components/PartnerCardSingle';


export default async function Page({
    params,
}: {
    params: { email: string }
}) {
    const email = (await params).email

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${email}`, {
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data')
        }

        const userData: Partner[] = await response.json()
        return (
            <>
                <PartnerCardSingle partner={userData[0]}></PartnerCardSingle>
            </>
        )
    } catch (error) {
        console.error('Error fetching user data:', error)
        notFound()
    }
}

