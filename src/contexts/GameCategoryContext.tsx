import { createDataContext } from './createDataContext'
import { GameCategory } from '../types/gameCategory'
import { getGameCategories } from '../services/gameCategoryService'

const { DataProvider, DataContext } = createDataContext<GameCategory[]>(getGameCategories)

export const GameCategoryProvider = DataProvider
export const GameCategoryContext = DataContext
