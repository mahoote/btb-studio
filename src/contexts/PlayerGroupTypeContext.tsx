import { createDataContext } from './createDataContext'
import { getPlayerGroupTypes } from '../services/playerGroupTypeService'
import { GenericType } from '../types/genericType'

const { DataProvider, DataContext } = createDataContext<GenericType[]>(getPlayerGroupTypes)

export const PlayerGroupTypeProvider = DataProvider
export const PlayerGroupTypeContext = DataContext
