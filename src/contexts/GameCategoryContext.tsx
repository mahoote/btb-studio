import { createDataContext } from './createDataContext'
import { getGameCategories } from '../services/gameCategoryService'
import { GenericType } from '../types/genericType'

const { DataProvider, DataContext } = createDataContext<GenericType[]>(getGameCategories)

export const GameCategoryProvider = DataProvider
export const GameCategoryContext = DataContext
