import React, { useEffect, useState } from 'react'
import useNewGame from '../../../hooks/useNewGame'
import { NewGame } from '../../../types/newGame'
import { createNewGame } from '../../../utils/newGameFormUtils'
import NewGameFormComponent from './newGameFormComponent'
import HorizontalLinearStepperComponent from '../../../components/horizontalLinearStepperComponent'
import AdvancedSettingsComponent from './advancedSettingsComponent'
import { isActionCardSettingsDataValid } from '../../../utils/actionCardSettingsUtils'
import {
    initialAccessoriesData,
    initialGameTypesData,
    initialNewGameData,
} from '../../../constants/NEW_GAME_FORM_DATA'
import { createAdvancedSettingsData } from '../../../utils/advancedSettingsUtils'
import useGameOptionsData from '../../../hooks/useGameOptionsData'

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
        actionCardInputs,
        activeFormRef,
        advancedSettingsData,
    } = useNewGame()

    const { gameTypes, accessories } = useGameOptionsData()

    const [newGameData, setNewGameData] = useState<NewGame>(initialNewGameData)

    const submitForm = async () => {
        const { createdGame: createdNewGame } = await createNewGame(
            newGameData,
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
        setNewGameData(initialNewGameData)
        setDescriptions(initialNewGameData.descriptions)
        setCreatedGame(null)
        setSelectedGameTypes(initialGameTypesData)
        setSelectedAccessories(initialAccessoriesData)
    }

    useEffect(() => {
        setNewGameData((prevState: NewGame) => {
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
            onFinnish={() => void submitForm()}
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
