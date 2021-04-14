import React from "react";
import Profile from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {
    getStatusThunkCreator,
    updateStatusThunkCreator
} from "../../redux/action";
import {getUserProfileThunkCreator, ProfileInfoType} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter, Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type MapStatePropsForRedirectType = {
    isAuth: boolean
}

type MapStatePropsType = {
    profile: null | ProfileInfoType
    status: string
    authorizedUserId: null
    isAuth:boolean
}
type MapDispatchPropsType = {
    getUserProfileThunkCreator: (userId: number) => void
    getStatusThunkCreator: (userId: number) => void
    updateStatusThunkCreator: (status: string) => void
}
type PathParamsTYpe = {
    userId: string
}
type ProfilePropsType = MapDispatchPropsType & MapStatePropsType
type PropsType = RouteComponentProps<PathParamsTYpe> & ProfilePropsType

class ProfileContainer extends React.Component<any, PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
        }
        this.props.getUserProfileThunkCreator(userId)
        this.props.getStatusThunkCreator(userId)
    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatusThunkCreator={this.props.updateStatusThunkCreator}/>
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth

})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfileThunkCreator,
        getStatusThunkCreator,
        updateStatusThunkCreator
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

// let WithUrlDataContainerComponent = withRouter(ProfileContainer)
//
// export default withAuthRedirect(connect(mapStateToProps, {getUserProfileThunkCreator})(WithUrlDataContainerComponent));