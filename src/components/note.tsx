import {Card, createStyles, Fade, Grid, IconButton, makeStyles, Theme, Typography} from '@material-ui/core'
import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {grey, red, yellow} from "@material-ui/core/colors";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {NoteModal} from "./modal";
import {deleteNoteTH, editNoteTH} from "../redux/reducer";
import {AppStateType} from "../redux/store";

export type NoteType = {
    id: string,
    text: string
}

export const NoteElement = React.memo((props: NoteType) => {

    const [open, setOpen] = useState(false)


    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            delete: {
                color: red[500],
                fontSize: 20

            },
            deleteButton: {
                position: 'absolute',
                top: 15,
                right: 10,
                zIndex: 100
            },
            edit: {
                color: yellow[500],
                fontSize: 20
            },
            editButton: {
                position: 'absolute',
                top: 15,
                right: 50,
                zIndex: 100
            },
            card: {
                position: 'relative',
                background: grey[900],
                height: 'max-content',
                padding: 30,

            }
        }),
    );

    const classes = useStyles()
    const dispatch = useDispatch()

    const data = useSelector<AppStateType, NoteType[]>(state => state.reducer.notes)

    const deleteButtonHandler = () => {
        const confirmValue = window.confirm('Are you really want to delete this note?')
        confirmValue && dispatch(deleteNoteTH(props.id, data))
    }

    const editNoteHandler = (text: string) => {
        dispatch(editNoteTH(props.id, text, data))
    }

    const handleModalClose = () => {
        setOpen(false);
    }
    const handleModalOpen = () => {
        setOpen(true);
    }

    return (
        <Fade in={true}>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                <NoteModal isOpen={open}
                           handleClose={handleModalClose}
                           handleOpen={handleModalOpen}
                           editCallBack={editNoteHandler}
                           addCallBack={() => {}}
                           action={'edit'}
                           text={props.text}
                />

                <Card className={classes.card}>
                    <IconButton aria-label="delete"
                                className={classes.deleteButton}
                                onClick={deleteButtonHandler}
                    >
                        <DeleteIcon color='primary'
                                    className={classes.delete}/>
                    </IconButton>
                    <IconButton aria-label="edit"
                                className={classes.editButton}
                                onClick={handleModalOpen}
                    >
                        <EditIcon color='primary'
                                  className={classes.edit}/>
                    </IconButton>
                    <div>{props.text}</div>
                </Card>
            </Grid>
        </Fade>
    )
})