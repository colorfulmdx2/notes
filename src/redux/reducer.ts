import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import {NoteType} from "../components/note";
import {loadState, saveState} from "../local-storage/local-storage";

export type ActionsType =
    | ReturnType<typeof setNotes>
    | ReturnType<typeof editNote>
    | ReturnType<typeof addNote>
    | ReturnType<typeof deleteNote>
    | ReturnType<typeof setPreloader>
    | ReturnType<typeof setSearchValue>


let initialState = {
    notes: [] as NoteType[],
    preloader: false,
    searchValue: ''
}

export type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const reducer = (state = initialState, action: ActionsType) => {

    switch (action.type) {
        case "SET_DATA": {
            return {...state, notes: action.data}
        }
        case "ADD_NOTE": {
            return {...state, notes: [...state.notes, action.note]}
        }
        case "DELETE_NOTE": {
            return {...state, notes: state.notes.filter((e) => e.id !== action.id)}
        }
        case "EDIT_NOTE": {
            return {
                ...state, notes: state.notes.map((e) => {
                    if (e.id === action.id) {
                        e.text = action.text
                        return e
                    } else {
                        return e
                    }
                })
            }
        }
        case "SET_PRELOADER": {
            return {...state, preloader: action.value}
        }
        case "SET_SEARCH_VALUE ": {
            return {...state, searchValue: action.value}
        }
        default:
            return state;
    }
}
export const setNotes = (data: NoteType[]) => ({type: 'SET_DATA', data} as const)
export const editNote = (id: string, text: string) => ({type: 'EDIT_NOTE', id, text} as const)
export const addNote = (note: NoteType) => ({type: 'ADD_NOTE', note} as const)
export const deleteNote = (id: string) => ({type: 'DELETE_NOTE', id} as const)
export const setPreloader = (value: boolean) => ({type: 'SET_PRELOADER', value} as const)
export const setSearchValue = (value: string) => ({type: 'SET_SEARCH_VALUE ', value} as const)


export const initializeApp = (): ThunkActionType => async (dispatch) => {
    dispatch(setPreloader(true))
    let data = await loadState()
    dispatch(setNotes(data ? data : []))
    dispatch(setPreloader(false))
}
export const addNoteTH = (note: NoteType, notes: NoteType[]): ThunkActionType => async (dispatch) => {
    dispatch(addNote(note))
    saveState([...notes, note])
}
export const deleteNoteTH = (id: string, notes: NoteType[]): ThunkActionType => async (dispatch) => {
    dispatch(deleteNote(id))
    saveState(notes.filter((e) => e.id !== id))
}
export const editNoteTH = (id: string, text: string, notes: NoteType[]): ThunkActionType => async (dispatch) => {
    dispatch(editNote(id, text))
    saveState(notes.map((e) => {
        if (e.id === id) {
            e.text = text
            return e
        } else {
            return e
        }
    }))
}
