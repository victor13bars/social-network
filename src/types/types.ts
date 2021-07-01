export type PostType = {
    id: number
    message: string
    likeCount: number
}
export type ContactsType = {
    facebook: string,
    website: string,
    vk: string,
    twitter: string,
    instagram: string,
    youtube: string,
    github: string,
    mainLink: string
}
export type PhotosType = {
    small: string | null,
    large: string | null
}
export type ProfileInfoType = {
    aboutMe: string,
    contacts: ContactsType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: PhotosType
}
export type UserType = {
    id: number,
    photos:PhotosType,
    followed: boolean,
    name: string,
    location: {
        city: string,
        country: string
    },
    status: string
}

