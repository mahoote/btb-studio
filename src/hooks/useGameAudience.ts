import { useContext } from 'react'
import { DataContextType } from '../types/contexts/dataContextType'
import { GameAudienceContext } from '../contexts/GameAudienceContext'
import { GenericType } from '../types/genericType'

export const useGameAudience = (): DataContextType<GenericType[]> => {
    const context = useContext(GameAudienceContext)
    if (!context) {
        throw new Error('useGameAudience must be used within a GameAudienceProvider')
    }
    return context
}
