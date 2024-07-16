import { createDataContext } from './createDataContext'
import { getGameTypes } from '../services/gameTypeService'
import { GenericType } from '../types/genericType'

const { DataProvider, DataContext } = createDataContext<GenericType[]>(getGameTypes)

export const GameTypesProvider = DataProvider
export const GameTypeContext = DataContext
