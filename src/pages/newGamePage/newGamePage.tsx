import React, { useEffect, useState } from 'react'
import NewGameFormComponent from './components/newGameFormComponent'
import { Grid, Typography } from '@mui/material'
import PreviewWindowComponent from './components/previewWindowComponent'
import { NewGameFormData } from '../../types/formData'
import { GameCategoryProvider } from '../../contexts/GameCategoryContext'
import { GameTypesProvider } from '../../contexts/GameTypeContext'
import { AccessoryProvider } from '../../contexts/AccessoryContext'
import HorizontalLinearStepperComponent from '../../components/horizontalLinearStepperComponent'

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

    function BasicStep() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <NewGameFormComponent formData={formData} setFormData={setFormData} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <PreviewWindowComponent
                        name={formData.name}
                        descriptions={descriptions}
                        setDescriptions={setDescriptions}
                    />
                </Grid>
            </Grid>
        )
    }

    return (
        <GameCategoryProvider>
            <GameTypesProvider>
                <AccessoryProvider>
                    <Typography variant="h5" paddingY={2}>
                        New Game
                    </Typography>

                    <HorizontalLinearStepperComponent
                        steps={[{ title: 'Basic Info', content: <BasicStep /> }]}
                    />
                </AccessoryProvider>
            </GameTypesProvider>
        </GameCategoryProvider>
    )
}

export default NewGamePage
