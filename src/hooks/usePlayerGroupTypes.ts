import { useContext } from 'react'
import { DataContextType } from '../types/contexts/dataContextType'
import { PlayerGroupTypeContext } from '../contexts/PlayerGroupTypeContext'
import { GenericType } from '../types/genericType'

export const usePlayerGroupTypes = (): DataContextType<GenericType[]> => {
    const context = useContext(PlayerGroupTypeContext)
    if (!context) {
        throw new Error('usePlayerGroupTypes must be used within a PlayerGroupTypeProvider')
    }
    return context
}
