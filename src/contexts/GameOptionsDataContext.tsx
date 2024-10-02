import { GameOptionsDataContextType } from '../types/contexts/gameOptionsDataContextType'
import React, { createContext, useEffect, useState } from 'react'
import { getGameCategories } from '../services/gameCategoryService'
import { getGameTypes } from '../services/gameTypeService'
import { getAccessories } from '../services/accessoryService'
import { getGameAudience } from '../services/gameAudienceService'
import { GenericType } from '../types/genericType'

interface GameOptionsDataProviderProps {
    children: React.ReactNode
}

export const GameOptionsDataContext = createContext<GameOptionsDataContextType | undefined>(
    undefined
)

const GameOptionsDataProvider = ({ children }: GameOptionsDataProviderProps) => {
    const [gameCategories, setGameCategories] = useState<GenericType[]>([])
    const [gameTypes, setGameTypes] = useState<GenericType[]>([])
    const [playerGroupTypes, setPlayerGroupTypes] = useState<GenericType[]>([])
    const [accessories, setAccessories] = useState<GenericType[]>([])
    const [gameAudience, setGameAudience] = useState<GenericType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const gameCategories = await getGameCategories()
            const gameTypes = await getGameTypes()
            const playerGroupTypes = await getGameTypes()
            const accessories = await getAccessories()
            const gameAudience = await getGameAudience()

            setGameCategories(gameCategories)
            setGameTypes(gameTypes)
            setPlayerGroupTypes(playerGroupTypes)
            setAccessories(accessories)
            setGameAudience(gameAudience)
        }

        fetchData().catch((error: Error) => {
            console.error(`Error fetching game data: ${error.message}`)
        })
    }, [])

    return (
        <GameOptionsDataContext.Provider
            value={{ gameCategories, gameTypes, playerGroupTypes, accessories, gameAudience }}
        >
            {children}
        </GameOptionsDataContext.Provider>
    )
}

export default GameOptionsDataProvider
