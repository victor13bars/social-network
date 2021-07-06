import {getAuthUserDataThunk} from "./auth-reducer";
import {InferActionsType} from "./redux-store";


let initialState = {
    initialized: false
}
export type InitializedAuthType = typeof initialState

type AppActionType = InferActionsType<typeof actions>

export const appReducer = (state = initialState, action: AppActionType): InitializedAuthType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED-SUCCESS':
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED-SUCCESS'} as const)
}

export const initializeAppThunk = () => (dispatch:any) => {
    let promise = dispatch(getAuthUserDataThunk());
    promise.then(() => {
            dispatch(actions.initializedSuccess());
        }
    )
    ;
}

export default appReducer;