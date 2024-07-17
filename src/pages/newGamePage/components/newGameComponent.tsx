import React, { useEffect, useState } from 'react'
import useNewGameContext from '../../../hooks/useNewGame'
import { useGameTypes } from '../../../hooks/useGameTypes'
import { useAccessories } from '../../../hooks/useAccessories'
import { NewGameFormData } from '../../../types/formData'
import { createGame } from '../../../services/gameService'
import { GameDto } from '../../../types/game'
import { addAccessoriesToGame, addGameTypesToGame } from '../../../utils/newGameFormUtils'
import NewGameFormComponent from './newGameFormComponent'
import HorizontalLinearStepperComponent from '../../../components/horizontalLinearStepperComponent'
import AdvancedSettingsComponent from './advancedSettingsComponent'
import { isActionCardSettingsDataValid } from '../../../utils/actionCardSettingsUtils'
import {
    initialAccessoriesData,
    initialGameTypesData,
    initialNewGameData,
} from '../../../constants/newGameFormData'
import {
    initialActionCardInputs,
    initialActionCardSettingsData,
} from '../../../constants/actionCardSettingsData'

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
        actionCardSettingsData,
        setActionCardSettingsData,
        actionCardInputs,
        setActionCardInputs,
        activeFormRef,
    } = useNewGameContext()

    const { data: gameTypes } = useGameTypes()
    const { data: accessories } = useAccessories()

    const [newGameData, setNewGameData] = useState<NewGameFormData>(initialNewGameData)

    const handleSubmit = async () => {
        setCreatedGame(undefined)

        newGameData.descriptions = newGameData.descriptions.filter(
            description => description !== ''
        )

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
        setDescriptions(initialNewGameData.descriptions)
        setCreatedGame(undefined)
        setSelectedGameTypes(initialGameTypesData)
        setSelectedAccessories(initialAccessoriesData)
        setActionCardSettingsData(initialActionCardSettingsData)
        setActionCardInputs(initialActionCardInputs)
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
                        <NewGameFormComponent
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
                    customValidation: () =>
                        isActionCardSettingsDataValid(
                            actionCardSettingsData,
                            actionCardInputs
                        ),
                },
                {
                    label: 'Summary',
                    content: <div>Summary</div>,
                },
            ]}
            onFinnish={handleFormSubmit}
            onReset={handleResetForm}
            completeMessage={`"${createdGame?.name}" was created.`}
            isComplete={!!createdGame}
            isFormValid={() => {
                if (activeFormRef.current) {
                    if (activeFormRef.current.checkValidity()) {
                        return true
                    } else {
                        activeFormRef.current.reportValidity()
                        return false
                    }
                }
                return true
            }}
        />
    )
}

export default NewGameComponent
