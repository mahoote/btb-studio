import React, { createContext, useState } from 'react'
import { NewGameContextType } from '../types/contexts/newGameContextType'
import { GameDto } from '../types/game'

interface NewGameProviderProps {
    children: React.ReactNode
}

export const NewGameContext = createContext<NewGameContextType | undefined>(undefined)

const NewGameProvider = ({ children }: NewGameProviderProps) => {
    const [descriptions, setDescriptions] = useState<string[]>([''])
    const [createdGame, setCreatedGame] = useState<GameDto | undefined>({} as GameDto)
    const [selectedAccessories, setSelectedAccessories] = useState<string[]>([])
    const [selectedGameTypes, setSelectedGameTypes] = useState<string[]>([])

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
            }}
        >
            {children}
        </NewGameContext.Provider>
    )
}

export default NewGameProvider
