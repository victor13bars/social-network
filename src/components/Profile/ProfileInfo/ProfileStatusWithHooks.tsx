import React, {ChangeEvent, useState} from "react";
import classes from './ProfileInfo.module.css';

export type ProfileStatusWithHooksType = {
    status: string,
    updateStatusThunkCreator: (status: string) => void
}
const ProfileStatusWithHooks = (props: ProfileStatusWithHooksType) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

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
                <span onDoubleClick={activateEditMode}>{props.status || "----------------"}</span>
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