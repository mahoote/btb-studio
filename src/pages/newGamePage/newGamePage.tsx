import React, { useEffect, useState } from 'react'
import { createNewGame } from '../../utils/newGameFormUtils'
import NewGameFormComponent from './components/newGameFormComponent'
import HorizontalLinearStepperComponent from '../../components/horizontalLinearStepperComponent'
import AdvancedSettingsComponent from './components/advancedSettingsComponent'
import { isActionCardSettingsDataValid } from '../../utils/actionCardSettingsUtils'
import {
    initialAccessoriesData,
    initialGameTypesData,
    initialNewGameData,
} from '../../constants/NEW_GAME_FORM_DATA'
import { createAdvancedSettingsData } from '../../utils/advancedSettingsUtils'
import { useNewGameStore } from '../../hooks/useNewGameStore'
import { useGameOptionsStore } from '../../hooks/useGameOptionsStore'
import { Box, IconButton, Tooltip } from '@mui/material'
import { RestartAlt } from '@mui/icons-material'
import { initialAdvancedSettingsData } from '../../constants/ADVANCED_SETTINGS_DATA'
import { initialActionCardSettingsData } from '../../constants/ACTION_CARD_SETTINGS_DATA'
import { GameDto } from '../../types/gameDto'

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
    } = useNewGameStore()

    const { gameTypes, accessories } = useGameOptionsStore()

    const [createdGame, setCreatedGame] = useState<GameDto | null>(null)

    const submitForm = async () => {
        const { createdGame: createdNewGame } = await createNewGame(
            newGame,
            selectedAccessories,
            selectedGameTypes,
            accessories,
            gameTypes,
            advancedSettingsData
        )

        setCreatedGame(createdNewGame)

        if (!createdNewGame) {
            return
        }

        await createAdvancedSettingsData(
            createdNewGame,
            advancedSettingsData,
            actionCardSettingsData,
            actionCardInputs
        )

        handleResetForm(false)
    }

    const handleResetForm = (reloadPage: boolean = true) => {
        // Default settings
        setNewGame(initialNewGameData)
        setDescriptions(initialNewGameData.descriptions)
        setSelectedGameTypes(initialGameTypesData)
        setSelectedAccessories(initialAccessoriesData)

        // Advanced settings
        setAdvancedSettingsData(initialAdvancedSettingsData)
        setActionCardSettingsData(initialActionCardSettingsData)

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
            <HorizontalLinearStepperComponent
                steps={[
                    {
                        label: 'New Game',
                        content: (
                            <NewGameFormComponent
                                formData={newGame}
                                setFormData={setNewGame}
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
