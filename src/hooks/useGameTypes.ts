import { useContext } from 'react'
import { GameTypeContext } from '../contexts/GameTypeContext'
import { DataContextType } from '../types/contexts/dataContextType'
import { GenericType } from '../types/genericType'

export const useGameTypes = (): DataContextType<GenericType[]> => {
    const context = useContext(GameTypeContext)
    if (!context) {
        throw new Error('useGameTypes must be used within a GameTypeProvider')
    }
    return context
}
