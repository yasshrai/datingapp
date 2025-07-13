import { Partner } from "@/types/partner";

export interface Chat {
  partner: string
  lastMessage: string
}
export interface Like {
  liker: string
  likerEmail: string
  likedEmail: string
  createdAt: string
}
export interface Confession {
  name: string
  message: string
  timestamp: string
}
export interface UsercardProps {
    userdata: Partner
}

export interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
  partners: Partner[]
  onSelectPartner: (partner: Partner) => void
}
export interface UseLikesReturn {
    likes: Like[];
    error: string | null;
    loading: boolean;
}