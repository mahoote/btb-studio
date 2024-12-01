import React, { useEffect, useState } from 'react'
import {
    addAccessoriesToGame,
    addGameTypesToGame,
    createNewGame,
} from '../../utils/newGameFormUtils'
import NewGameFormComponent from './components/newGame/newGameFormComponent'
import LinearStepperComponent from '../../components/linearStepperComponent'
import AdvancedSettingsFormComponent from './components/advancedSettings/advancedSettingsFormComponent'
import { isActionCardSettingsDataValid } from '../../utils/actionCardSettingsUtils'
import {
    initialAccessoriesData,
    initialGameTypesData,
    initialNewGameData,
    initialNewGameTranslations,
} from '../../constants/NEW_GAME_FORM_DATA'
import { useNewGameStore } from '../../hooks/useNewGameStore'
import { useGameOptionsStore } from '../../hooks/useGameOptionsStore'
import { Box, IconButton, Tooltip } from '@mui/material'
import { RestartAlt } from '@mui/icons-material'
import { initialAdvancedSettingsData } from '../../constants/ADVANCED_SETTINGS_DATA'
import {
    initialActionCardInputs,
    initialActionCardSettingsData,
} from '../../constants/ACTION_CARD_SETTINGS_DATA'
import { GameDto } from '../../types/gameDto'
import TranslationsFormComponent from './components/translations/translationsFormComponent'
import NewGameSummaryComponent from './components/summary/newGameSummaryComponent'
import { deleteNewGame } from '../../services/gameService'
import { createAdvancedSettingsData } from '../../utils/advancedSettingsUtils'
import { initialWritingSettingsData } from '../../constants/WRITING_SETTINGS_DATA'

/**
 * Mostly logic regarding the new game form.
 * Builds the different steps in the form.
 * @constructor
 */
function NewGamePage() {
    const {
        newGame,
        setNewGame,
        selectedAccessories,
        setDescriptions,
        descriptions,
        selectedGameTypes,
        setSelectedGameTypes,
        setSelectedAccessories,
        actionCardSettingsData,
        setActionCardSettingsData,
        actionCardInputs,
        activeFormRef,
        advancedSettingsData,
        setAdvancedSettingsData,
        setActionCardInputs,
        setNewGameTranslations,
        formStepIndex,
        setFormStepIndex,
        newGameTranslations,
        setWritingSettingsData,
    } = useNewGameStore()

    const { gameTypes, accessories } = useGameOptionsStore()

    const [createdGame, setCreatedGame] = useState<GameDto | null>(null)

    const handleResetForm = (reloadPage: boolean = true) => {
        // Default settings
        setFormStepIndex(0)

        setNewGame(initialNewGameData)
        setDescriptions(initialNewGameData.descriptions)
        setSelectedGameTypes(initialGameTypesData)
        setSelectedAccessories(initialAccessoriesData)

        // Advanced settings
        setAdvancedSettingsData(initialAdvancedSettingsData)
        setActionCardSettingsData(initialActionCardSettingsData)
        setActionCardInputs(initialActionCardInputs)
        setWritingSettingsData(initialWritingSettingsData)

        // Translations
        setNewGameTranslations(initialNewGameTranslations)

        if (reloadPage) window.location.reload()
    }

    const submitForm = async () => {
        let createdNewGame: GameDto | null = null

        try {
            createdNewGame = await createNewGame(
                newGame,
                advancedSettingsData,
                newGameTranslations
            )
        } catch (error) {
            console.error('Submit form:', error)
            setFormStepIndex(0)
            return
        }

        if (!createdNewGame) return

        try {
            // Add accessories and game types
            await addAccessoriesToGame(selectedAccessories, accessories, createdNewGame.id)
            await addGameTypesToGame(selectedGameTypes, gameTypes, createdNewGame.id)

            // Add advanced settings
            await createAdvancedSettingsData(
                createdNewGame.id,
                newGameTranslations,
                advancedSettingsData,
                actionCardSettingsData,
                actionCardInputs
            )

            setCreatedGame(createdNewGame)
            // Reset the form
            handleResetForm(false)
        } catch (error) {
            console.error('Failed to create game:', error)
            setFormStepIndex(0)

            // Clean up by deleting the created game
            try {
                await deleteNewGame(createdNewGame.id)
            } catch (cleanupError) {
                console.error('Failed to delete game:', cleanupError)
                setFormStepIndex(0)
            }
        }
    }

    useEffect(() => {
        setNewGame({
            ...newGame,
            descriptions: descriptions,
        })
    }, [setNewGame, descriptions])

    return (
        <Box>
            <Box display="flex" justifyContent="center" mb={1}>
                <Tooltip title="Restart form.">
                    <IconButton aria-label="reset" onClick={() => handleResetForm()}>
                        <RestartAlt />
                    </IconButton>
                </Tooltip>
            </Box>
            <LinearStepperComponent
                steps={[
                    {
                        label: 'New Game',
                        content: <NewGameFormComponent />,
                    },
                    {
                        label: 'Advanced Settings',
                        content: <AdvancedSettingsFormComponent />,
                        customValidation: () =>
                            isActionCardSettingsDataValid(
                                actionCardSettingsData,
                                actionCardInputs
                            ),
                    },
                    {
                        label: 'Translations',
                        content: <TranslationsFormComponent />,
                    },
                    {
                        label: 'Summary',
                        content: <NewGameSummaryComponent />,
                    },
                ]}
                formStepIndex={formStepIndex}
                setFormStepIndex={setFormStepIndex}
                onFinnish={() => void submitForm()}
                onReset={handleResetForm}
                completeMessage={`"${createdGame?.name}" was created.`}
                isComplete={!!createdGame}
                isFormValid={() => {
                    if (activeFormRef?.current) {
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
        </Box>
    )
}

export default NewGamePage
