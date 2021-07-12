import React, {useEffect} from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UserSearchForm from "./UsersSearchForm";
import {FilterType, followTC, getUsersTC, unfollowTC} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalItemsCount,
    getUsers
} from "../../redux/users-selectors";


type PropsUsType = {}

let Users: React.FC<PropsUsType> = (props) => {

    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)
    const totalItemsCount = useSelector(getTotalItemsCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const portionSize = useSelector((state: AppStateType) => state.usersPage.portionSize)
    const filter = useSelector((state: AppStateType) => state.usersPage.filter)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersTC(currentPage, pageSize, filter))
    }, [currentPage, dispatch, filter, pageSize])

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersTC(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersTC(1, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(followTC(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowTC(userId))
    }

    return <div>
        <UserSearchForm onFilterChanged={onFilterChanged}/>
        <Paginator pageSize={pageSize} totalItemsCount={totalItemsCount} portionSize={portionSize}
                   currentPage={currentPage} onPageChanged={onPageChanged}/>
        <div>
            {users.map(u => <User user={u}
                                  key={u.id}
                                  followingInProgress={followingInProgress}
                                  follow={follow}
                                  unfollow={unfollow}/>
            )}
        </div>
    </div>
}

export default Users;