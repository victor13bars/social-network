import {PhotosType, ProfileInfoType} from "../types/types";
import {instance, APIResponseType} from "./api";

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileInfoType>(`profile/${userId}`)
            .then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {status: status})
            .then(res => res.data)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<APIResponseType<PhotosType>>(`profile/photo`, formData)
            .then(res => res.data)
    },
    saveProfile(profile: ProfileInfoType) {
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/`, profile)
            .then(res => res.data)
    }
}