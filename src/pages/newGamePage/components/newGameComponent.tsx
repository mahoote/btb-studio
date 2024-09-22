import React, { useEffect, useState } from 'react'
import useNewGameContext from '../../../hooks/useNewGame'
import { useGameTypes } from '../../../hooks/useGameTypes'
import { useAccessories } from '../../../hooks/useAccessories'
import { NewGameFormData } from '../../../types/formData'
import { createNewGame } from '../../../utils/newGameFormUtils'
import NewGameFormComponent from './newGameFormComponent'
import HorizontalLinearStepperComponent from '../../../components/horizontalLinearStepperComponent'
import AdvancedSettingsComponent from './advancedSettingsComponent'
import { isActionCardSettingsDataValid } from '../../../utils/actionCardSettingsUtils'
import {
    initialAccessoriesData,
    initialGameTypesData,
    initialNewGameData,
} from '../../../constants/newGameFormData'
import { createAdvancedSettingsData } from '../../../utils/advancedSettingsUtils'

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
    } = useNewGameContext()

    const { data: gameTypes } = useGameTypes()
    const { data: accessories } = useAccessories()

    const [newGameData, setNewGameData] = useState<NewGameFormData>(initialNewGameData)

    const submitForm = async () => {
        const { createdGame: createdNewGame } = await createNewGame(
            newGameData,
            selectedAccessories,
            selectedGameTypes,
            accessories,
            gameTypes
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

    const handleFormSubmit = () => {
        submitForm().catch(error => {
            console.error('Error submitting form:', error)
        })
    }

    const handleResetForm = () => {
        setNewGameData(initialNewGameData)
        setDescriptions(initialNewGameData.descriptions)
        setCreatedGame(null)
        setSelectedGameTypes(initialGameTypesData)
        setSelectedAccessories(initialAccessoriesData)
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
