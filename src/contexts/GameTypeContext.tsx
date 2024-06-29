import { createDataContext } from './createDataContext'
import { GameType } from '../types/gameType'
import { getGameTypes } from '../services/gameTypeService'

const { DataProvider, DataContext } = createDataContext<GameType[]>(getGameTypes)

export const GameTypesProvider = DataProvider
export const GameTypeContext = DataContext
