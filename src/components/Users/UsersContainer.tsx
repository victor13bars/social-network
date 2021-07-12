import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {FilterType, followTC, getUsersTC, unfollowTC} from "../../redux/users-reducer";
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

type OwnPropsType = {
    pageTitle: string
}

type mapStateToPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalItemsCount: number,
    currentPage: number,
    portionSize: number,
    isFetching: boolean,
    followingInProgress: Array<number>,
    filter:FilterType
}
type mapDispatchToPropsType = {
    getUsersTC: (currentPage: number, pageSize: number, filter:FilterType) => void,
    unfollowTC: (userId: number) => void,
    followTC: (userId: number) => void
}
type PropsUserType = mapStateToPropsType & mapDispatchToPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsUserType> {

    componentDidMount() {
        const {currentPage, pageSize,filter} = this.props;
        this.props.getUsersTC(currentPage, pageSize, filter)
    }

    onPageChanged = (pageNumber: number) => {
        const {getUsersTC, pageSize,filter} = this.props
        getUsersTC(pageNumber, pageSize, filter)
    }

    onFilterChanged = (filter: FilterType) => {
        const {getUsersTC, pageSize, currentPage} = this.props
        getUsersTC(1, pageSize, filter)
    }

    render() {
        return <>
            {/*{this.props.pageTitle}*/}
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalItemsCount={this.props.totalItemsCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   portionSize={this.props.portionSize}
                   onPageChanged={this.onPageChanged}
                   onFilterChanged={this.onFilterChanged}
                   users={this.props.users}
                   followingInProgress={this.props.followingInProgress}
                   unfollowTC={this.props.unfollowTC}
                   followTC={this.props.followTC}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        filter:state.usersPage.filter,
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        portionSize: state.usersPage.portionSize,
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUsersTC,
        followTC,
        unfollowTC
    }),
    withAuthRedirect)(UsersContainer)
