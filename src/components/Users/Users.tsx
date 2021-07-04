import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type PropsUsType = {
    followingInProgress: Array<number>
    users: Array<UserType>,
    pageSize: number,
    totalItemsCount: number,
    currentPage: number,
    portionSize: number,
    onPageChanged: (pageNumber: number) => void
    unfollowTC: (userId: number) => void
    followTC: (userId: number) => void
}

let Users: React.FC<PropsUsType> = ({
                                        pageSize, totalItemsCount,
                                        currentPage,
                                        portionSize,
                                        onPageChanged,
                                        users,
                                        ...props
                                    }) => {

    return <div>
        <Paginator pageSize={pageSize} totalItemsCount={totalItemsCount} portionSize={portionSize}
                   currentPage={currentPage} onPageChanged={onPageChanged}/>
        <div>
            {users.map(u => <User user={u}
                                  key={u.id}
                                  followingInProgress={props.followingInProgress}
                                  followTC={props.followTC}
                                  unfollowTC={props.unfollowTC}/>
            )}
        </div>
    </div>
}
export default Users;