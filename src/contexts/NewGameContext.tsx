import React, { createContext, RefObject, useRef, useState } from 'react'
import { NewGameContextType } from '../types/contexts/newGameContextType'
import { GameDto } from '../types/gameDto'
import { ActionCardSettings, AdvancedSettings, WritingSettings } from '../types/newGame'
import {
    initialAccessoriesData,
    initialGameTypesData,
    initialNewGameData,
} from '../constants/NEW_GAME_FORM_DATA'
import { initialWritingSettingsData } from '../constants/WRITING_SETTINGS_DATA'
import { initialAdvancedSettingsData } from '../constants/ADVANCED_SETTINGS_DATA'

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
        ActionCardSettings | undefined
    >()
    const [actionCardInputs, setActionCardInputs] = useState<string[] | undefined>()

    const [activeFormRef, setActiveFormRef] = useState<RefObject<HTMLFormElement>>(
        useRef(null)
    )

    const [writingSettingsData, setWritingSettingsData] = useState<
        WritingSettings | undefined
    >(initialWritingSettingsData)

    const [advancedSettingsData, setAdvancedSettingsData] = useState<
        AdvancedSettings | undefined
    >(initialAdvancedSettingsData)

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
                writingSettingsData,
                setWritingSettingsData,
                advancedSettingsData,
                setAdvancedSettingsData,
            }}
        >
            {children}
        </NewGameContext.Provider>
    )
}

export default NewGameProvider
