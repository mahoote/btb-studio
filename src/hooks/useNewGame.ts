import { NewGameContextType } from '../types/contexts/newGameContextType'
import { useContext } from 'react'
import { NewGameContext } from '../contexts/NewGameContext'

const useNewGame = (): NewGameContextType => {
    const context = useContext(NewGameContext)
    if (context === undefined) {
        throw new Error('useNewGameContext must be used within a NewGameProvider')
    }
    return context
}

export default useNewGame
