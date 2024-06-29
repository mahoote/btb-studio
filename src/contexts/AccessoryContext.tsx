import { createDataContext } from './createDataContext'
import { Accessory } from '../types/accessory'
import { getAccessories } from '../services/accessoryService'

const { DataProvider, DataContext } = createDataContext<Accessory[]>(getAccessories)

export const AccessoryProvider = DataProvider
export const AccessoryContext = DataContext
