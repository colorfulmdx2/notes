import React, {ChangeEvent, useState} from "react";
import {createStyles, Fab, Grid, Grow, makeStyles, TextField, Theme} from "@material-ui/core";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {useDispatch, useSelector} from "react-redux";
import {grey, yellow} from "@material-ui/core/colors";
import {NoteModal} from "./modal";
import {addNote, addNoteTH, editNoteTH, setSearchValue} from "../redux/reducer";
import {NoteType} from "./note";
import {AppStateType} from "../redux/store";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        fabButton: {
            background: yellow[300],
            "&:hover": {
                background: yellow[700]
            }

        },
        alert: {
            position: 'absolute',
            top: 150,
            left: 0,
            right: 0,
            margin: '0 auto',
            width: 320,
            zIndex: 101
        },
        search: {
            width: '100%',

        }
    }),
);

export const Header = React.memo(() => {

    const dispatch = useDispatch()
    const classes = useStyles()


    const [open, setOpen] = useState(false)

    const searchOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchValue(e.currentTarget.value))
    }

    const handleModalClose = () => {
        setOpen(false)
    }

    const handleModalOpen = () => {
        setOpen(true)
    }

    const addNoteHandler = (note: NoteType, notes: NoteType[]) => {
       dispatch(addNoteTH(note, notes))
    }

const searchValue = useSelector<AppStateType, string>(state => state.reducer.searchValue)

    return (
        <Grow in={true}>
            <Grid container style={{marginBottom: 20}}>
                <Grid item xs={3} sm={2} md={1} lg={1} xl={1}>
                    <Fab color="primary"
                         aria-label="add"
                         className={classes.fabButton}
                         onClick={handleModalOpen}
                    >
                        <PlaylistAddIcon/>
                    </Fab>
                    <NoteModal isOpen={open}
                               handleClose={handleModalClose}
                               handleOpen={handleModalOpen}
                               addCallBack={addNoteHandler}
                               editCallBack={() => {}}
                               action={'add'}
                               text={''}
                    />
                </Grid>
                <Grid item xs={9} sm={10} md={11} lg={11} xl={11} style={{textAlign: 'center'}}>
                    <TextField className={classes.search}
                               value={searchValue}
                               onChange={searchOnchangeHandler}
                               variant="filled"
                               label="Search"
                               color={'secondary'}
                    />
                </Grid>
            </Grid>
        </Grow>
    )
})