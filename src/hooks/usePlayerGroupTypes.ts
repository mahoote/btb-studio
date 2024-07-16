import { useContext } from 'react'
import { DataContextType } from '../types/contexts/dataContextType'
import { PlayerGroupType } from '../types/playerGroupType'
import { PlayerGroupTypeContext } from '../contexts/PlayerGroupTypeContext'

export const usePlayerGroupTypes = (): DataContextType<PlayerGroupType[]> => {
    const context = useContext(PlayerGroupTypeContext)
    if (!context) {
        throw new Error('usePlayerGroupTypes must be used within a PlayerGroupTypeProvider')
    }
    return context
}
