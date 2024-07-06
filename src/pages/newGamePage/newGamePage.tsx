import React from 'react'
import { GameCategoryProvider } from '../../contexts/GameCategoryContext'
import { GameTypesProvider } from '../../contexts/GameTypeContext'
import { AccessoryProvider } from '../../contexts/AccessoryContext'
import NewGameProvider from '../../contexts/NewGameContext'
import NewGameComponent from './components/newGameComponent'

function NewGamePage() {
    return (
        <NewGameProvider>
            <GameCategoryProvider>
                <GameTypesProvider>
                    <AccessoryProvider>
                        <NewGameComponent />
                    </AccessoryProvider>
                </GameTypesProvider>
            </GameCategoryProvider>
        </NewGameProvider>
    )
}

export default NewGamePage
