import { useContext } from 'react'
import { DataContextType } from '../types/contexts/dataContextType'
import { GenericType } from '../types/genericType'
import { ActionCardStateContext } from '../contexts/ActionCardStateContext'

export const useActionCardStates = (): DataContextType<GenericType[]> => {
    const context = useContext(ActionCardStateContext)
    if (!context) {
        throw new Error('useActionCardStates must be used within a ActionCardStateProvider')
    }
    return context
}
