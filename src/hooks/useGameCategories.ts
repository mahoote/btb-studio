import { useContext } from 'react'
import { GameCategoryContext } from '../contexts/GameCategoryContext'
import { DataContextType } from '../types/contexts/dataContextType'
import { GenericType } from '../types/genericType'

export const useGameCategories = (): DataContextType<GenericType[]> => {
    const context = useContext(GameCategoryContext)
    if (!context) {
        throw new Error('useGameCategories must be used within a GameCategoryProvider')
    }
    return context
}
