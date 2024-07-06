import { useContext } from 'react'
import { AccessoryContext } from '../contexts/AccessoryContext'
import { Accessory } from '../types/accessory'
import { DataContextType } from '../types/contexts/dataContextType'

export const useAccessories = (): DataContextType<Accessory[]> => {
    const context = useContext(AccessoryContext)
    if (!context) {
        throw new Error('useAccessories must be used within a AccessoryProvider')
    }
    return context
}
