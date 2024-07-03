import React, { useEffect, useState } from 'react'
import NewGameFormComponent from './components/newGameFormComponent'
import { Grid } from '@mui/material'
import PhoneFrameComponent from './components/phoneFrameComponent'
import { NewGameFormData } from '../../types/formData'
import { GameCategoryProvider } from '../../contexts/GameCategoryContext'
import { GameTypesProvider } from '../../contexts/GameTypeContext'
import { AccessoryProvider } from '../../contexts/AccessoryContext'

function NewGamePage() {
    const [descriptions, setDescriptions] = useState<string[]>([''])

    const [formData, setFormData] = useState<NewGameFormData>({
        activityLevel: 0,
        categoryId: 1,
        descriptions: descriptions,
        drunkLevel: 0,
        gameAudienceId: undefined,
        introDescription: undefined,
        maxPlayers: undefined,
        minPlayers: 2,
        minutes: 0,
        name: '',
        playerGroupTypeId: undefined,
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
        <GameCategoryProvider>
            <GameTypesProvider>
                <AccessoryProvider>
                    <div>
                        <h2>New Game</h2>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <NewGameFormComponent
                                    formData={formData}
                                    setFormData={setFormData}
                                />
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
                </AccessoryProvider>
            </GameTypesProvider>
        </GameCategoryProvider>
    )
}

export default NewGamePage
