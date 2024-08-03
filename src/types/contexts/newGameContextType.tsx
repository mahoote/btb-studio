import React, { RefObject } from 'react'
import { GameDto } from '../game'
import { ActionCardSettingsData } from '../formData'

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
}

export type { NewGameContextType }
