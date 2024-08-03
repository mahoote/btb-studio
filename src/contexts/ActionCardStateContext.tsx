import { createDataContext } from './createDataContext'
import { GenericType } from '../types/genericType'
import { getActionCardStates } from '../services/actionCardService'

const { DataProvider, DataContext } = createDataContext<GenericType[]>(getActionCardStates)

export const ActionCardStateProvider = DataProvider
export const ActionCardStateContext = DataContext
