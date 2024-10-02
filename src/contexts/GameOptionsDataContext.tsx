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
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    const [gameCategories, setGameCategories] = useState<GenericType[]>([])
    const [gameTypes, setGameTypes] = useState<GenericType[]>([])
    const [playerGroupTypes, setPlayerGroupTypes] = useState<GenericType[]>([])
    const [accessories, setAccessories] = useState<GenericType[]>([])
    const [gameAudience, setGameAudience] = useState<GenericType[]>([])

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const [
                    gameCategoriesResponse,
                    gameTypesResponse,
                    playerGroupTypesResponse,
                    accessoriesResponse,
                    gameAudienceResponse,
                ] = await Promise.all([
                    getGameCategories(),
                    getGameTypes(),
                    getGameTypes(),
                    getAccessories(),
                    getGameAudience(),
                ])

                setGameCategories(gameCategoriesResponse)
                setGameTypes(gameTypesResponse)
                setPlayerGroupTypes(playerGroupTypesResponse)
                setAccessories(accessoriesResponse)
                setGameAudience(gameAudienceResponse)
            } catch (error) {
                console.error('Failed to fetch game data: ', error)
                setError(error as Error)
            } finally {
                setLoading(false)
            }
        }

        void fetchData()
    }, [])

    return (
        <GameOptionsDataContext.Provider
            value={{
                loading,
                error,
                gameCategories,
                gameTypes,
                playerGroupTypes,
                accessories,
                gameAudience,
            }}
        >
            {children}
        </GameOptionsDataContext.Provider>
    )
}

export default GameOptionsDataProvider
