import React from "react";
import Profile from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";

import {getStatusTC, getUserProfileTC, savePhoto, saveProfile, updateStatusTC} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileInfoType} from "../../types/types";


type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    getUserProfileTC: (userId: number) => void
    getStatusTC: (userId: number) => void
    updateStatusTC: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileInfoType) => Promise<any>
}
type PathParamsType = {
    userId: string
}


type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        if (!userId) {
            console.log("ID should exists in URI params ot state ('authorizedUserId') ")
        } else {
            this.props.getUserProfileTC(userId)
            this.props.getStatusTC(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
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
                         updateStatusTC={this.props.updateStatusTC}
                         savePhoto={this.props.savePhoto}
                         saveProfile={this.props.saveProfile}
                />
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth

})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfileTC,
        getStatusTC,
        updateStatusTC,
        savePhoto,
        saveProfile
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
