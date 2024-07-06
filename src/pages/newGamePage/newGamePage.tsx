import React, { useEffect } from 'react'
import NewGameFormComponent from './components/newGameFormComponent'
import { Grid, Typography } from '@mui/material'
import PreviewWindowComponent from './components/previewWindowComponent'
import { NewGameFormData } from '../../types/formData'
import { GameCategoryProvider } from '../../contexts/GameCategoryContext'
import { GameTypesProvider } from '../../contexts/GameTypeContext'
import { AccessoryProvider } from '../../contexts/AccessoryContext'
import HorizontalLinearStepperComponent from '../../components/horizontalLinearStepperComponent'
import useNewGameContext from '../../hooks/useNewGame'

function NewGamePage() {
    const { setFormData, descriptions, setDescriptions, formData } = useNewGameContext()

    useEffect(() => {
        setFormData((prevState: NewGameFormData) => {
            return {
                ...prevState,
                descriptions: descriptions,
            }
        })
    }, [descriptions])

    function NewGameStep() {
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
                        steps={[{ title: 'Basic Info', content: <NewGameStep /> }]}
                    />
                </AccessoryProvider>
            </GameTypesProvider>
        </GameCategoryProvider>
    )
}

export default NewGamePage
