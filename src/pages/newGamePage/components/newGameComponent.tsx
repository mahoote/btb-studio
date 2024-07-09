import React, { useEffect, useState } from 'react'
import useNewGameContext from '../../../hooks/useNewGame'
import { useGameTypes } from '../../../hooks/useGameTypes'
import { useAccessories } from '../../../hooks/useAccessories'
import { NewGameFormData } from '../../../types/formData'
import { createGame } from '../../../services/gameService'
import { GameDto } from '../../../types/game'
import {
    addAccessoriesToGame,
    addGameTypesToGame,
    initialNewGameData,
} from '../../../utils/newGameFormUtils'
import { Grid } from '@mui/material'
import NewGameFormComponent from './newGameFormComponent'
import PreviewWindowComponent from './previewWindowComponent'
import HorizontalLinearStepperComponent from '../../../components/horizontalLinearStepperComponent'
import AdvancedSettingsComponent from './advancedSettingsComponent'
import { initialActionCardSettingsData } from '../../../utils/actionCardSettingsUtils'

type NewGameStepProps = {
    formData: NewGameFormData
    setFormData: React.Dispatch<React.SetStateAction<NewGameFormData>>
    descriptions: string[]
    setDescriptions: React.Dispatch<React.SetStateAction<string[]>>
}

/**
 * The first step in the new game form.
 * @param formData
 * @param setFormData
 * @param descriptions
 * @param setDescriptions
 * @constructor
 */
function NewGameStep({
    formData,
    setFormData,
    descriptions,
    setDescriptions,
}: NewGameStepProps) {
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

/**
 * Mostly logic regarding the new game form.
 * Builds the different steps in the form.
 * @constructor
 */
function NewGameComponent() {
    const {
        setCreatedGame,
        createdGame,
        selectedAccessories,
        setDescriptions,
        descriptions,
        selectedGameTypes,
        setSelectedGameTypes,
        setSelectedAccessories,
        setActionCardSettingsData,
        setActionCardInputs,
    } = useNewGameContext()

    const { data: gameTypes } = useGameTypes()
    const { data: accessories } = useAccessories()

    const [newGameData, setNewGameData] = useState<NewGameFormData>(initialNewGameData)

    const handleSubmit = async () => {
        setCreatedGame(undefined)

        const updatedDescriptions = newGameData.descriptions.filter(
            description => description !== ''
        )

        if (updatedDescriptions.length === 0) {
            alert('Please add at least one description')
            return
        }

        newGameData.descriptions = updatedDescriptions

        const newGame = await createGame({
            name: newGameData.name,
            intro_description: newGameData.introDescription,
            descriptions: newGameData.descriptions,
            min_players: newGameData.minPlayers,
            max_players: newGameData.maxPlayers,
            activity_level: newGameData.activityLevel,
            drunk_level: newGameData.drunkLevel,
            minutes: newGameData.minutes,
            player_group_type_id: newGameData.playerGroupTypeId,
            game_audience_id: newGameData.gameAudienceId,
            game_category_id: newGameData.categoryId,
        })
            .then((response: GameDto | null) => {
                if (!response) {
                    console.error('Could not fetch game from database.')
                    return
                }
                setCreatedGame(response)
                return response
            })
            .catch(error => {
                console.error('Error creating game:', error)
                alert('Error creating game')
                setCreatedGame({} as GameDto)
            })

        if (newGame) {
            const { errorMessage: accessoryErrorMessage } = await addAccessoriesToGame(
                selectedAccessories,
                accessories,
                newGame
            )
            if (accessoryErrorMessage) alert('Error adding accessory to game')

            const { errorMessage: gameTypeErrorMessage } = await addGameTypesToGame(
                selectedGameTypes,
                gameTypes,
                newGame
            )
            if (gameTypeErrorMessage) alert('Error adding game type to game')

            // TODO: Make logic to delete game if an error occurs adding the accessories or game types.
        }
    }

    const handleFormSubmit = () => {
        handleSubmit().catch(error => {
            console.error('Error submitting form:', error)
        })
    }

    const handleResetForm = () => {
        setNewGameData(initialNewGameData)
        setDescriptions([''])
        setCreatedGame(undefined)
        setSelectedGameTypes([])
        setSelectedAccessories([])
        setActionCardSettingsData(initialActionCardSettingsData)
        setActionCardInputs([''])
    }

    useEffect(() => {
        setNewGameData((prevState: NewGameFormData) => {
            return {
                ...prevState,
                descriptions: descriptions,
            }
        })
    }, [setNewGameData, descriptions])

    return (
        <HorizontalLinearStepperComponent
            steps={[
                {
                    label: 'New Game',
                    content: (
                        <NewGameStep
                            formData={newGameData}
                            setFormData={setNewGameData}
                            descriptions={descriptions}
                            setDescriptions={setDescriptions}
                        />
                    ),
                },
                {
                    label: 'Advanced Settings',
                    content: <AdvancedSettingsComponent />,
                },
            ]}
            onFinnish={handleFormSubmit}
            onReset={handleResetForm}
            completeMessage={`"${createdGame?.name}" was created.`}
            isComplete={!!createdGame}
        />
    )
}

export default NewGameComponent
