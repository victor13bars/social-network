import React from "react";
import Profile from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";

import {
    getStatusThunkCreator,
    getUserProfileThunkCreator,
    ProfileInfoType, savePhoto,
    updateStatusThunkCreator
} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter, Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

type MapStatePropsForRedirectType = {
    isAuth: boolean
}

type MapStatePropsType = {
    profile:  ProfileInfoType | null
    status: string
    authorizedUserId: null
    isAuth: boolean
}
type MapDispatchPropsType = {
    getUserProfileThunkCreator: (userId: number) => void
    getStatusThunkCreator: (userId: number) => void
    updateStatusThunkCreator: (status: string) => void
    savePhoto: (file: any) => void

}
type PathParamsTYpe = {
    userId: string
}
type ProfilePropsType = MapDispatchPropsType & MapStatePropsType
type PropsType = RouteComponentProps<PathParamsTYpe> & ProfilePropsType

class ProfileContainer extends React.Component<any, PropsType> {
    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.histoty.push("/login");
            }
        }
        this.props.getUserProfileThunkCreator(userId)
        this.props.getStatusThunkCreator(userId)
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<PropsType>, snapshot?: any) {
        debugger
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                         isOwner={!this.props.match.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatusThunkCreator={this.props.updateStatusThunkCreator}
                         savePhoto={this.props.savePhoto}/>
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
        updateStatusThunkCreator,
        savePhoto
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

// let WithUrlDataContainerComponent = withRouter(ProfileContainer)
//
// export default withAuthRedirect(connect(mapStateToProps, {getUserProfileThunkCreator})(WithUrlDataContainerComponent));