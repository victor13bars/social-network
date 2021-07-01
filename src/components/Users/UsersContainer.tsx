import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    followSuccess, followThunkCreator, getUsersThunkCreator,
    setCurrentPage,
    unfollowSuccess,
    unfollowThunkCreator
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalItemsCount,
    getUsers
} from "../../redux/users-selectors";
import {UserType} from "../../types/types";

type mapStateToPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalItemsCount: number,
    currentPage: number,
    portionSize: number,
    isFetching: boolean,
    followingInProgress: Array<number>,
}
type mapDispatchToPropsType = {
    followSuccess: (id: number) => void,
    unfollowSuccess: (id: number) => void,
    setCurrentPage: (currentPage: number) => void,
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void,
    unfollowThunkCreator: (userId: number) => void,
    followThunkCreator: (userId: number) => void
}
type PropsUserType = mapStateToPropsType & mapDispatchToPropsType

class UsersContainer extends React.Component<any, PropsUserType> {

    componentDidMount() {
        const {currentPage, pageSize, portionSize} = this.props;
        this.props.getUsersThunkCreator(currentPage, pageSize)
        // this.props.toggleIsFetching(true)
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //     this.props.toggleIsFetching(false)
        //     this.props.setUsers(data.items)
        //     this.props.setTotalUsersCount(data.totalCount)
        // });
    }

    onPageChanged = (pageNumber: number) => {
        const {getUsersThunkCreator, pageSize} = this.props
        getUsersThunkCreator(pageNumber, pageSize)
        // this.props.toggleIsFetching(true)
        // this.props.setCurrentPage(pageNumber)
        // usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
        //     this.props.toggleIsFetching(false)
        //     this.props.setUsers(data.items)
        // });
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalItemsCount={this.props.totalItemsCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   portionSize={this.props.portionSize}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   followSuccess={this.props.followSuccess}
                   unfollowSuccess={this.props.unfollowSuccess}
                   followingInProgress={this.props.followingInProgress}
                   unfollowThunkCreator={this.props.unfollowThunkCreator}
                   followThunkCreator={this.props.followThunkCreator}
            />
        </>
    }
}

// let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
//
let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        portionSize: state.usersPage.portionSize,
        followingInProgress: getFollowingInProgress(state)
    }
}
// let mapDispatchToProps = (dispatch: Dispatch<UsersReducersTypes>) => {
//     return {
//         follow: (userId: number) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId: number) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users: Array<UserType>) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (currentPage: number) => {
//             dispatch(setCurrentPageAC(currentPage))
//         },
//         setTotalUsersCount: (totalCount: number) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching: boolean) => {
//             dispatch(toggleIsFetchingAC(isFetching));
//
//         }
//     }
// }
// let AuthRedirect = withAuthRedirect(UsersContainer)
export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        followSuccess,
        unfollowSuccess,
        setCurrentPage,
        getUsersThunkCreator,
        followThunkCreator,
        unfollowThunkCreator
    }),
    withAuthRedirect)(UsersContainer)

// export default connect(mapStateToProps, {
//     followSuccess,
//     unfollowSuccess,
//     setCurrentPage,
//     getUsersThunkCreator,
//     followThunkCreator,
//     unfollowThunkCreator
// })(AuthRedirect);