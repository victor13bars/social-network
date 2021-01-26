import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'api-key': '8eaba7cd-8849-4eb5-b90f-f5fda0cd9786'
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`, )
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },

    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    }
}

export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`)
    }
}




