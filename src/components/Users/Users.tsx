import React, {useEffect} from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UserSearchForm from "./UsersSearchForm";
import {FilterType, followTC, getUsersTC, unfollowTC} from "../../redux/users-reducer";
import {AppStateType} from "../../redux/redux-store";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalItemsCount,
    getUsers
} from "../../redux/users-selectors";
import {useHistory} from 'react-router-dom';
import * as queryString from "querystring";
import {useDispatch, useSelector} from "react-redux";

type PropsUsType = {}

type QueryParamsType = { term?: string, page?: string, friend?: string };
let Users: React.FC<PropsUsType> = (props) => {

    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)
    const totalItemsCount = useSelector(getTotalItemsCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const portionSize = useSelector((state: AppStateType) => state.usersPage.portionSize)
    const filter = useSelector((state: AppStateType) => state.usersPage.filter)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break;
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break;
            case'false':
                actualFilter = {...actualFilter, friend: false}
                break;
        }

        dispatch(getUsersTC(actualPage, pageSize, actualFilter))
    },[])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
            //`?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    },[currentPage, filter])

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