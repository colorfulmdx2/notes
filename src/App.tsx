import React, {useEffect} from 'react';
import './App.css';
import {CircularProgress, createMuiTheme, Paper, ThemeProvider} from "@material-ui/core";
import {blue, grey, indigo} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {Header} from "./components/header";
import {Content} from "./components/content";
import {initializeApp} from "./redux/reducer";
import {AppStateType} from "./redux/store";


function App() {

    const theme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                dark: grey[900],
                light: indigo[500],
                main: grey[500],
            },
            secondary: {
                dark: indigo[300],
                light: indigo[300],
                main: indigo[300],
            }
        }
    })

    const dispatch = useDispatch()

    const preloader = useSelector<AppStateType, boolean>(state => state.reducer.preloader)

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])


    return (
        <ThemeProvider theme={theme}>
            <Paper elevation={0} square
                   style={{minHeight: '100vh', padding: '30px 20px 30px 20px', boxSizing: 'border-box'}}>
                {
                    preloader
                        ? <CircularProgress style={{position: "absolute", top: 0, left: '50%'}} color="secondary"/>
                        : <><Header/>
                            <Content/></>
                }

            </Paper>
        </ThemeProvider>
    );
}

export default App;