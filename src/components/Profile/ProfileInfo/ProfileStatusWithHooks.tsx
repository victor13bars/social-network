import React, {ChangeEvent, useEffect, useState} from "react";
import classes from './ProfileInfo.module.css';
// import React, {ChangeEvent} from "react";
// import classes from './ProfileInfo.module.css';
//
//
// class ProfileStatus extends React.Component<any> {
//     state = {
//         editMode: false,
//         status: this.props.status
//     }
//
//     activateEditMode = () => {
//         this.setState({
//             editMode: true
//         })
//     }
//
//     deactivateEditMode = () => {
//         this.setState({
//             editMode: false
//         })
//         this.props.updateStatusThunkCreator(this.state.status)
//     }
//
//     onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
//         this.setState({status: e.currentTarget.value})
//
//     }
//
//     componentDidUpdate(prevProps: any, prevState: any) {
//         if (prevProps.status !== this.props.status) {
//             this.setState({
//                 status: this.props.status
//             })
//         }
//     }
//
//     render() {
//         return (
//             <div>
//                 {!this.state.editMode &&
//                 <div>
//                     <span onDoubleClick={this.activateEditMode}>{this.props.status || "----------------"}</span>
//                 </div>
//                 }
//                 {this.state.editMode &&
//                 <div>
//                     <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode}
//                            value={this.state.status}></input>
//                 </div>
//                 }
//             </div>
//         )
//     }
// }
//
// export default ProfileStatus;

export type ProfileStatusWithHooksType = {
    status: string,
    updateStatusThunkCreator: (status: string) => void
}
const ProfileStatusWithHooks = (props: ProfileStatusWithHooksType) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatusThunkCreator(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)

    }
    return (
        <div>
            {!editMode &&
            <div>
                <b>Status: </b> <span onDoubleClick={activateEditMode}>{props.status || "----------------"}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                       value={status}></input>
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;