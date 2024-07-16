import { createDataContext } from './createDataContext'
import { GameAudience } from '../types/gameAudience'
import { getGameAudience } from '../services/gameAudienceService'

const { DataProvider, DataContext } = createDataContext<GameAudience[]>(getGameAudience)

export const GameAudienceProvider = DataProvider
export const GameAudienceContext = DataContext
