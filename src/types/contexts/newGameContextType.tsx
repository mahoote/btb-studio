import { NewGameFormData } from '../formData'
import React from 'react'
import { GameDto } from '../game'

type NewGameContextType = {
    formData: NewGameFormData
    setFormData: React.Dispatch<React.SetStateAction<NewGameFormData>>
    descriptions: string[]
    setDescriptions: React.Dispatch<React.SetStateAction<string[]>>
    createdGame: GameDto | undefined
    setCreatedGame: React.Dispatch<React.SetStateAction<GameDto | undefined>>
    selectedAccessories: string[]
    setSelectedAccessories: React.Dispatch<React.SetStateAction<string[]>>
    selectedGameTypes: string[]
    setSelectedGameTypes: React.Dispatch<React.SetStateAction<string[]>>
}

export type { NewGameContextType }
