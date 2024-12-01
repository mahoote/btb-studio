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
    } = useNewGameStore()

    const { gameTypes, accessories } = useGameOptionsStore()

    const [createdGame, setCreatedGame] = useState<GameDto | null>(null)

    const submitForm = async () => {
        try {
            const createdNewGame = await createNewGame(
                newGame,
                advancedSettingsData,
                newGameTranslations
            )

            setCreatedGame(createdNewGame)
        } catch (error) {
            console.error('Submit form:', error)
            return
        }

        if (!createdGame) return

        try {
            await addAccessoriesToGame(selectedAccessories, accessories, createdGame.id)
            await addGameTypesToGame(selectedGameTypes, gameTypes, createdGame.id)
        } catch (error) {
            console.error('Failed to create game:', error)
            await deleteNewGame(createdGame.id)
            return
        }

        try {
            await createAdvancedSettingsData(
                createdGame.id,
                newGameTranslations,
                advancedSettingsData,
                actionCardSettingsData,
                actionCardInputs
            )
        } catch (error) {
            console.error('Failed to create game:', error)
            await deleteNewGame(createdGame.id)
            return
        }

        handleResetForm(false)
    }

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

        // Translations
        setNewGameTranslations(initialNewGameTranslations)

        if (reloadPage) window.location.reload()
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
