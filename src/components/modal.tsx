import React, {ChangeEvent, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {Button, Icon, IconButton, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {v4 as uuidv4} from 'uuid';
import {NoteType} from "./note";
import {Simulate} from "react-dom/test-utils";
import {AppStateType} from "../redux/store";


type AddUserModalType = {
    isOpen: boolean
    handleOpen: () => void
    handleClose: () => void
    addCallBack: (note: NoteType, notes: NoteType[]) => void
    editCallBack: (text: string) => void
    action: string
    text: string
}


export const NoteModal = React.memo((props: AddUserModalType) => {


    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            modal: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                "&:focus": {
                    outline: "none"
                }
            },
            content: {
                display: 'flex',
                "&:focus": {
                    outline: "none"
                }
            }
        }),
    );

    const {notes} = useSelector<AppStateType, any>(state => state.reducer)

    const classes = useStyles()
    const dispatch = useDispatch()

    const [value, setValue] = useState(props.text)
    const [error, setError] = useState<boolean>(false)
    const [disable, setDisable] = useState<boolean>(false)

    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (value.length > 25) {
            setError(true)
            setDisable(true)
        } else {
            setError(false)
            setDisable(false)
        }
        setValue(e.currentTarget.value)
    }


    const addNoteHandler = () => {
        props.addCallBack({
            id: uuidv4(),
            text: value.length > 0 ? value : "You to lazy to type, it`s fine :)"
        }, notes)
        setValue('')
        props.handleClose()
    }

    const editNoteHandler = () => {
        props.editCallBack(value)
        setValue('')
        props.handleClose()
    }
    return (
        <div style={{boxSizing: 'border-box'}}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.isOpen}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >


                <div className={classes.content}>
                    <TextField variant="outlined"
                               color={'primary'}
                               value={value}
                               onChange={onchangeHandler}
                               error={error}
                               helperText={error ? 'To many symbols' : ''}

                    />
                    <IconButton aria-label="add"
                                onClick={props.action === 'add' ? addNoteHandler : editNoteHandler}
                                disabled={disable}

                    >
                        <PlaylistAddIcon/>
                    </IconButton>
                </div>


            </Modal>
        </div>
    );
})

