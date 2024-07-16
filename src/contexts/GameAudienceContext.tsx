import { createDataContext } from './createDataContext'
import { getGameAudience } from '../services/gameAudienceService'
import { GenericType } from '../types/genericType'

const { DataProvider, DataContext } = createDataContext<GenericType[]>(getGameAudience)

export const GameAudienceProvider = DataProvider
export const GameAudienceContext = DataContext
