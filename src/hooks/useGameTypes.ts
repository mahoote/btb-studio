import { useContext } from 'react'
import { GameTypeContext } from '../contexts/GameTypeContext'
import { GameType } from '../types/gameType'
import { DataContextType } from '../types/contexts/dataContextType'

export const useGameTypes = (): DataContextType<GameType[]> => {
    const context = useContext(GameTypeContext)
    if (!context) {
        throw new Error('useGameTypes must be used within a GameTypeProvider')
    }
    return context
}
