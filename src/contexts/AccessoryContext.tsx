import { createDataContext } from './createDataContext'
import { getAccessories } from '../services/accessoryService'
import { GenericType } from '../types/genericType'

const { DataProvider, DataContext } = createDataContext<GenericType[]>(getAccessories)

export const AccessoryProvider = DataProvider
export const AccessoryContext = DataContext
