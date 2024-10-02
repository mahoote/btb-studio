import { useContext } from 'react'
import { GameOptionsDataContextType } from '../types/contexts/gameOptionsDataContextType'
import { GameOptionsDataContext } from '../contexts/GameOptionsDataContext'

const useGameOptionsData = (): GameOptionsDataContextType => {
    const context = useContext(GameOptionsDataContext)
    if (context === undefined) {
        throw new Error('useGameOptionsData must be used within a GameOptionsDataProvider')
    }
    return context
}

export default useGameOptionsData
