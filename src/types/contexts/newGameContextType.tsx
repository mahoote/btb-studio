import React, { RefObject } from 'react'
import { GameDto } from '../gameDto'
import { ActionCardSettings, AdvancedSettings, WritingSettings } from '../newGame'

type NewGameContextType = {
    descriptions: string[]
    setDescriptions: React.Dispatch<React.SetStateAction<string[]>>
    createdGame: GameDto | null
    setCreatedGame: React.Dispatch<React.SetStateAction<GameDto | null>>
    selectedAccessories: string[]
    setSelectedAccessories: React.Dispatch<React.SetStateAction<string[]>>
    selectedGameTypes: string[]
    setSelectedGameTypes: React.Dispatch<React.SetStateAction<string[]>>
    actionCardSettingsData: ActionCardSettings | undefined
    setActionCardSettingsData: React.Dispatch<
        React.SetStateAction<ActionCardSettings | undefined>
    >
    actionCardInputs: string[] | undefined
    setActionCardInputs: React.Dispatch<React.SetStateAction<string[] | undefined>>
    activeFormRef: RefObject<HTMLFormElement>
    setActiveFormRef: React.Dispatch<React.SetStateAction<RefObject<HTMLFormElement>>>
    writingSettingsData: WritingSettings | undefined
    setWritingSettingsData: React.Dispatch<React.SetStateAction<WritingSettings | undefined>>
    advancedSettingsData: AdvancedSettings | undefined
    setAdvancedSettingsData: React.Dispatch<React.SetStateAction<AdvancedSettings | undefined>>
}

export type { NewGameContextType }
