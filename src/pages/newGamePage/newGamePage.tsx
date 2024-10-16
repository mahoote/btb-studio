import React, { useEffect } from 'react'
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

/**
 * Mostly logic regarding the new game form.
 * Builds the different steps in the form.
 * @constructor
 */
function NewGamePage() {
    const {
        newGame,
        setNewGame,
        setCreatedGame,
        createdGame,
        selectedAccessories,
        setDescriptions,
        descriptions,
        selectedGameTypes,
        setSelectedGameTypes,
        setSelectedAccessories,
        actionCardSettingsData,
        actionCardInputs,
        activeFormRef,
        advancedSettingsData,
    } = useNewGameStore()

    const { gameTypes, accessories } = useGameOptionsStore()

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
            actionCardSettingsData,
            actionCardInputs
        )
    }

    const handleResetForm = () => {
        setNewGame(initialNewGameData)
        setDescriptions(initialNewGameData.descriptions)
        setCreatedGame(null)
        setSelectedGameTypes(initialGameTypesData)
        setSelectedAccessories(initialAccessoriesData)
    }

    useEffect(() => {
        setNewGame({
            ...newGame,
            descriptions: descriptions,
        })
    }, [setNewGame, descriptions])

    return (
        <HorizontalLinearStepperComponent
            steps={[
                {
                    label: 'New Game',
                    content: (
                        <NewGameFormComponent
                            formData={newGame}
                            setFormData={setNewGame}
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
    )
}

export default NewGamePage
