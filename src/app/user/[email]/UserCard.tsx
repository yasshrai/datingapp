import PartnerCardSingle from "@/components/PartnerCardSingle";
import { Partner } from "@/types/partner";

interface UsercardProps {
    userdata: Partner
}

export default function Usercard({ userdata }: UsercardProps) {
    if (!userdata) {
        return <div>No partner data available.</div>;
    }

    return (
        <div>
            <PartnerCardSingle partner={userdata} />
        </div>
    );
}

