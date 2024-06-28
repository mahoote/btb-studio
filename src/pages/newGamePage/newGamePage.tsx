import React from 'react'
import NewGameForm from './components/newGameForm'
import { Grid } from '@mui/material'

function NewGamePage() {
    return (
        <div>
            <h2>New Game</h2>
            <p>Info about this page</p>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <NewGameForm />
                </Grid>
            </Grid>
        </div>
    )
}

export default NewGamePage
