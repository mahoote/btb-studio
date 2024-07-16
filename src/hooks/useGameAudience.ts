import { useContext } from 'react'
import { DataContextType } from '../types/contexts/dataContextType'
import { GameAudience } from '../types/gameAudience'
import { GameAudienceContext } from '../contexts/GameAudienceContext'

export const useGameAudience = (): DataContextType<GameAudience[]> => {
    const context = useContext(GameAudienceContext)
    if (!context) {
        throw new Error('useGameAudience must be used within a GameAudienceProvider')
    }
    return context
}
