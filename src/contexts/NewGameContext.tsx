import React, { createContext, useState } from 'react'
import { NewGameContextType } from '../types/contexts/newGameContextType'
import { NewGameFormData } from '../types/formData'
import { GameDto } from '../types/game'

interface NewGameProviderProps {
    children: React.ReactNode
}

export const NewGameContext = createContext<NewGameContextType | undefined>(undefined)

const NewGameProvider = ({ children }: NewGameProviderProps) => {
    const [descriptions, setDescriptions] = useState<string[]>([''])
    const [formData, setFormData] = useState<NewGameFormData>({
        activityLevel: 0,
        categoryId: 1,
        descriptions: [],
        drunkLevel: 0,
        gameAudienceId: undefined,
        introDescription: undefined,
        maxPlayers: undefined,
        minPlayers: 2,
        minutes: 0,
        name: '',
        playerGroupTypeId: undefined,
    })
    const [createdGame, setCreatedGame] = useState<GameDto | undefined>({} as GameDto)
    const [selectedAccessories, setSelectedAccessories] = useState<string[]>([])
    const [selectedGameTypes, setSelectedGameTypes] = useState<string[]>([])

    return (
        <NewGameContext.Provider
            value={{
                formData,
                setFormData,
                descriptions,
                setDescriptions,
                createdGame,
                setCreatedGame,
                selectedAccessories,
                setSelectedAccessories,
                selectedGameTypes,
                setSelectedGameTypes,
            }}
        >
            {children}
        </NewGameContext.Provider>
    )
}

export default NewGameProvider
