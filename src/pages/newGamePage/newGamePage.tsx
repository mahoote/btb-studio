import React from 'react'
import NewGameFormComponent from './components/newGameFormComponent'
import { Grid } from '@mui/material'
import PhoneFrameComponent from './components/phoneFrameComponent'

function NewGamePage() {
    return (
        <div>
            <h2>New Game</h2>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <NewGameFormComponent />
                </Grid>
                <Grid item xs={12} md={6}>
                    <PhoneFrameComponent />
                </Grid>
            </Grid>
        </div>
    )
}

export default NewGamePage
