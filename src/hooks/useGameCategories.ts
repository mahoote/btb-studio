import { useContext } from 'react'
import { GameCategoryContext } from '../contexts/GameCategoryContext'
import { DataContextType } from '../contexts/createDataContext'
import { GameCategory } from '../types/gameCategory'

export const useGameCategories = (): DataContextType<GameCategory[]> => {
    const context = useContext(GameCategoryContext)
    if (!context) {
        throw new Error('useGameCategories must be used within a GameCategoryProvider')
    }
    return context
}
