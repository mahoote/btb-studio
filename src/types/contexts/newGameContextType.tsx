import React, { RefObject } from 'react'
import { GameDto } from '../game'
import { ActionCardSettingsData, WritingSettingsData } from '../newGameFormData'
import { AdvancedSettingsData } from '../AdvancedSettingsData'

type NewGameContextType = {
    descriptions: string[]
    setDescriptions: React.Dispatch<React.SetStateAction<string[]>>
    createdGame: GameDto | null
    setCreatedGame: React.Dispatch<React.SetStateAction<GameDto | null>>
    selectedAccessories: string[]
    setSelectedAccessories: React.Dispatch<React.SetStateAction<string[]>>
    selectedGameTypes: string[]
    setSelectedGameTypes: React.Dispatch<React.SetStateAction<string[]>>
    actionCardSettingsData: ActionCardSettingsData | undefined
    setActionCardSettingsData: React.Dispatch<
        React.SetStateAction<ActionCardSettingsData | undefined>
    >
    actionCardInputs: string[] | undefined
    setActionCardInputs: React.Dispatch<React.SetStateAction<string[] | undefined>>
    activeFormRef: RefObject<HTMLFormElement>
    setActiveFormRef: React.Dispatch<React.SetStateAction<RefObject<HTMLFormElement>>>
    writingSettingsData: WritingSettingsData | undefined
    setWritingSettingsData: React.Dispatch<
        React.SetStateAction<WritingSettingsData | undefined>
    >
    advancedSettingsData: AdvancedSettingsData | undefined
    setAdvancedSettingsData: React.Dispatch<
        React.SetStateAction<AdvancedSettingsData | undefined>
    >
}

export type { NewGameContextType }
