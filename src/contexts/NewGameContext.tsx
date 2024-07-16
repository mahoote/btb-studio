import React, { createContext, RefObject, useRef, useState } from 'react'
import { NewGameContextType } from '../types/contexts/newGameContextType'
import { GameDto } from '../types/game'
import { ActionCardSettingsData } from '../types/formData'
import {
    initalAccessoriesData,
    initialGameTypesData,
    initialNewGameData,
} from '../constants/newGameFormData'
import {
    initialActionCardInputs,
    initialActionCardSettingsData,
} from '../constants/actionCardSettingsData'

interface NewGameProviderProps {
    children: React.ReactNode
}

export const NewGameContext = createContext<NewGameContextType | undefined>(undefined)

const NewGameProvider = ({ children }: NewGameProviderProps) => {
    const [createdGame, setCreatedGame] = useState<GameDto | undefined>({} as GameDto)

    const [descriptions, setDescriptions] = useState<string[]>(initialNewGameData.descriptions)

    const [selectedAccessories, setSelectedAccessories] =
        useState<string[]>(initalAccessoriesData)
    const [selectedGameTypes, setSelectedGameTypes] = useState<string[]>(initialGameTypesData)

    const [actionCardSettingsData, setActionCardSettingsData] =
        useState<ActionCardSettingsData>(initialActionCardSettingsData)
    const [actionCardInputs, setActionCardInputs] = useState<string[]>(initialActionCardInputs)

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
