import React, {ChangeEvent} from "react";
import classes from './ProfileInfo.module.css';


class ProfileStatus extends React.Component<any> {
    state = {
        editMode: false,
        status:this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatusThunkCreator(this.state.status)
    }

    onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})

    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || "----------------"}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}></input>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;