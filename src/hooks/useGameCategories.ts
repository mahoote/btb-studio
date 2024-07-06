import { useContext } from 'react'
import { GameCategoryContext } from '../contexts/GameCategoryContext'
import { GameCategory } from '../types/gameCategory'
import { DataContextType } from '../types/contexts/dataContextType'

export const useGameCategories = (): DataContextType<GameCategory[]> => {
    const context = useContext(GameCategoryContext)
    if (!context) {
        throw new Error('useGameCategories must be used within a GameCategoryProvider')
    }
    return context
}
