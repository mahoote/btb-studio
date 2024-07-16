import { createDataContext } from './createDataContext'
import { PlayerGroupType } from '../types/playerGroupType'
import { getPlayerGroupTypes } from '../services/playerGroupTypeService'

const { DataProvider, DataContext } = createDataContext<PlayerGroupType[]>(getPlayerGroupTypes)

export const PlayerGroupTypeProvider = DataProvider
export const PlayerGroupTypeContext = DataContext
