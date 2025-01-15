import { Partner } from "./partner"
import { Like } from "@/app/likes/Likedlist"
export interface ResponseData {
    success: boolean
    data: Partner[]
}
export interface ResponseLikeData{
    success:boolean
    data:Like[]
}