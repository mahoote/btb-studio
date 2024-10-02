import React, { createContext, RefObject, useRef, useState } from 'react'
import { NewGameContextType } from '../types/contexts/newGameContextType'
import { GameDto } from '../types/game'
import { ActionCardSettingsData } from '../types/formData'
import {
    initialAccessoriesData,
    initialGameTypesData,
    initialNewGameData,
} from '../constants/newGameFormData'

interface NewGameProviderProps {
    children: React.ReactNode
}

export const NewGameContext = createContext<NewGameContextType | undefined>(undefined)

/**
 * A provider holding the state for creating a new game.
 * @param children
 * @constructor
 */
const NewGameProvider = ({ children }: NewGameProviderProps) => {
    const [createdGame, setCreatedGame] = useState<GameDto | null>(null)

    const [descriptions, setDescriptions] = useState<string[]>(initialNewGameData.descriptions)

    const [selectedAccessories, setSelectedAccessories] =
        useState<string[]>(initialAccessoriesData)
    const [selectedGameTypes, setSelectedGameTypes] = useState<string[]>(initialGameTypesData)

    const [actionCardSettingsData, setActionCardSettingsData] = useState<
        ActionCardSettingsData | undefined
    >()
    const [actionCardInputs, setActionCardInputs] = useState<string[] | undefined>()

    const [activeFormRef, setActiveFormRef] = useState<RefObject<HTMLFormElement>>(
        useRef(null)
    )

    return (
        <NewGameContext.Provider
            value={{
                descriptions,
                setDescriptions,
                createdGame,
                setCreatedGame,
                selectedAccessories,
                setSelectedAccessories,
                selectedGameTypes,
                setSelectedGameTypes,
                actionCardSettingsData,
                setActionCardSettingsData,
                actionCardInputs,
                setActionCardInputs,
                activeFormRef,
                setActiveFormRef,
            }}
        >
            {children}
        </NewGameContext.Provider>
    )
}

export default NewGameProvider
