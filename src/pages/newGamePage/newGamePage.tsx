import React, { useEffect, useState } from 'react'
import NewGameFormComponent from './components/newGameFormComponent'
import { Grid } from '@mui/material'
import PhoneFrameComponent from './components/phoneFrameComponent'
import { NewGameFormData } from '../../types/formData'

function NewGamePage() {
    const [descriptions, setDescriptions] = useState<string[]>([''])

    const [formData, setFormData] = useState<NewGameFormData>({
        name: '',
        categoryId: 1,
        introDescription: undefined,
        descriptions: descriptions,
        minPlayers: 2,
        maxPlayers: undefined,
        activityLevel: undefined,
        minutes: undefined,
        gameType: 1,
        playerGroupTypeId: undefined,
        gameAudienceId: undefined,
        drunkLevel: undefined,
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
