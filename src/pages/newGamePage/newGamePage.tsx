import React from 'react'
import NewGameForm from './components/newGameForm'
import { Grid } from '@mui/material'
import PhoneFrame from './components/phoneFrame'

function NewGamePage() {
    return (
        <div>
            <h2>New Game</h2>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <NewGameForm />
                </Grid>
                <Grid item xs={12} md={6}>
                    <PhoneFrame />
                </Grid>
            </Grid>
        </div>
    )
}

export default NewGamePage
