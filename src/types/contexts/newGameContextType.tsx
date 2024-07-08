import React from 'react'
import { GameDto } from '../game'
import { ActionCardSettingsData } from '../formData'

type NewGameContextType = {
    descriptions: string[]
    setDescriptions: React.Dispatch<React.SetStateAction<string[]>>
    createdGame: GameDto | undefined
    setCreatedGame: React.Dispatch<React.SetStateAction<GameDto | undefined>>
    selectedAccessories: string[]
    setSelectedAccessories: React.Dispatch<React.SetStateAction<string[]>>
    selectedGameTypes: string[]
    setSelectedGameTypes: React.Dispatch<React.SetStateAction<string[]>>
    actionCardSettingsData: ActionCardSettingsData
    setActionCardSettingsData: React.Dispatch<React.SetStateAction<ActionCardSettingsData>>
    actionCardInputs: string[]
    setActionCardInputs: React.Dispatch<React.SetStateAction<string[]>>
}

export type { NewGameContextType }
