import { useContext } from 'react'
import { AccessoryContext } from '../contexts/AccessoryContext'
import { DataContextType } from '../types/contexts/dataContextType'
import { GenericType } from '../types/genericType'

export const useAccessories = (): DataContextType<GenericType[]> => {
    const context = useContext(AccessoryContext)
    if (!context) {
        throw new Error('useAccessories must be used within a AccessoryProvider')
    }
    return context
}
