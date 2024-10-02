import { useContext } from 'react'
import { DataContextType } from '../types/contexts/dataContextType'
import { GenericType } from '../types/genericType'
import { ActionCardSettingsContext } from '../contexts/ActionCardSettingsContext'

export const useActionCardSettings = (): DataContextType<GenericType[]> => {
    const context = useContext(ActionCardSettingsContext)
    if (!context) {
        throw new Error(
            'useActionCardSettings must be used within a ActionCardSettingsProvider'
        )
    }
    return context
}
