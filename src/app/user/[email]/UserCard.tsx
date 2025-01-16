import PartnerCardSingle from "@/components/PartnerCardSingle";
import { Partner } from "@/types/partner";

interface UsercardProps {
    userdata: Partner[]
}

export default function Usercard({ userdata }: UsercardProps) {
    if (!userdata || userdata.length === 0) {
        return <div>No partner data available.</div>;
    }

    return (
        <div>
            <PartnerCardSingle partner={userdata[0]} />
        </div>
    );
}

