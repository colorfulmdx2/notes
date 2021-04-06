import React from "react";
import {NoteElement, NoteType} from "./note";
import {Grid} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store";


export const Content = React.memo(() => {

    const {notes, searchValue} = useSelector<AppStateType, any>(state => state.reducer)

    let filteredData = (searchValue: string) => {

        if (searchValue.length > 0) {
            return notes.filter((e: NoteType) => e.text.toLowerCase().includes(searchValue.toLowerCase()))
        } else {
            return notes
        }
    }

    let notesElements = filteredData(searchValue).map((e: NoteType) => <NoteElement id={e.id} text={e.text} key={e.id}/>)

    return (
        <Grid container spacing={3}>
            {notesElements}
        </Grid>
    )
})
