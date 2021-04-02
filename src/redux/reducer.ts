import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import {loadState} from "../local-storage/local-storage";

export type ActionsType =
    | ReturnType<typeof setData>




let initialState = {

}

export type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const reducer = (state = initialState, action: ActionsType) => {

    switch (action.type) {
        case "SET_DATA": {
            return {...state, usersData: action.data , usersDataCopy: action.data}
        }

        default:
            return state;
    }
}
export const setData = (data: any) => ({type: 'SET_DATA', data} as const);


export const getDataTC = (): ThunkActionType => async (dispatch) => {

}
