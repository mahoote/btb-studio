import React, { useEffect, useState } from 'react'
import NewGameFormComponent from './components/newGameFormComponent'
import { Grid } from '@mui/material'
import PhoneFrameComponent from './components/phoneFrameComponent'
import { NewGameFormData } from '../../types/formData'

function NewGamePage() {
    const [descriptions, setDescriptions] = useState<string[]>([''])

    const [formData, setFormData] = useState<NewGameFormData>({
        name: '',
        category: 1,
        introDescription: '',
        descriptions: descriptions,
        minPlayers: 2,
        maxPlayers: 0,
        activity: 0,
        minutes: 0,
        gameType: 1,
        playerGroupType: 0,
        gameAudience: 0,
        drunk: 0,
    })

    useEffect(() => {
        setFormData(prevState => {
            return {
                ...prevState,
                descriptions: descriptions,
            }
        })
    }, [descriptions])

    return (
        <div>
            <h2>New Game</h2>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <NewGameFormComponent formData={formData} setFormData={setFormData} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <PhoneFrameComponent
                        name={formData.name}
                        descriptions={descriptions}
                        setDescriptions={setDescriptions}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default NewGamePage
